import "./MyBlogs.css";
import { useEffect, useState } from "react";
import { Button } from "antd";
import BlogCard from "../components/BlogCard";
import LoadingCard from "../components/LoadingCard";
import { useNavigate } from "react-router-dom";
import { getContract } from "../ultils/Contract";
import PPTabs from "../components/Tabs";
import { getMetadata } from "../ultils/IPFS";

function MyBlogs() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [metadataBlogs, setMetadataBlogs] = useState();
    const [publicMdBlogs, setPublicMdBlogs] = useState();
    const [privateMdBlogs, setPrivateMdBlogs] = useState();
    const [blogs, setBlogs] = useState();
    console.log( 'this is ', window.location.pathname.split('/')[1]);

    async function getMetadataBlogs() {
        const ownedTotal = await getContract().ownedTotalSupply();
        let publicMds = [];
        let privateMds = [];
        for (let i = ownedTotal-1; i >= 0; i--) {
            const obj = await getContract().ownedTokenURI(i);

            const md = await getMetadata(obj[0]);
            console.log(md)
            console.log(obj[1])

            if(obj[1]) 
                publicMds.push({title: md.title, mode: obj[1], author: md.author, date: md.date, content: md.content, hash: obj[0], id: i});
            else
                privateMds.push({title: md.title, mode: obj[1], author: md.author, date: md.date, content: md.content, hash: obj[0], id: i});

            // publicMds.push({title: md.title, mode: obj[2], author: md.author, date: md.date, content: md.content, hash: obj[0]});
        }

        setMetadataBlogs(publicMds);
        setPublicMdBlogs(publicMds);
        setPrivateMdBlogs(privateMds);
        window.sessionStorage.setItem('my_blog_publicMdBlogs', JSON.stringify(publicMds));
        window.sessionStorage.setItem('my_blog_privateMdBlogs', JSON.stringify(privateMds));
        window.sessionStorage.setItem('my_blog_num', ownedTotal);
        setLoading(false);
    }

    async function checkNew() {
        return new Promise((resolve, reject) => {
            const total = getContract().ownedTotalSupply();
            return resolve(total);
        });
    }

    async function getBlogs() {

        let pubObjs = [];
        let privObjs = [];

        for (const blog of publicMdBlogs)
            pubObjs.push({title: blog.title, content: blog.content, 
                author: blog.author, date: blog.date, 
                mode: blog.mode, hash: blog.hash, id: blog.id});
        for (const blog of privateMdBlogs)
            privObjs.push({title: blog.title, content: blog.content, 
                author: blog.author, date: blog.date, 
                mode: blog.mode, hash: blog.hash, id: blog.id});

        setBlogs({public: pubObjs, private: privObjs});
        setLoading(false);
    }

    async function navigateNewBlog() {
        navigate('/new-blog')
    }

    useEffect(() => {if ((publicMdBlogs || privateMdBlogs) && !blogs) getBlogs();}, [publicMdBlogs, privateMdBlogs, blogs]);
    useEffect(() => {
        if (! publicMdBlogs || ! privateMdBlogs ) { 
            checkNew().then((total) => {
                const num = window.sessionStorage.getItem('my_blog_num');
                if (num && Number.parseInt(num) < total) {
                    getMetadataBlogs(); 
                }
                else {
                    const pub = window.sessionStorage.getItem('my_blog_publicMdBlogs');
                    const pri = window.sessionStorage.getItem('my_blog_privateMdBlogs');
                    if ( pub && pri ) {
                        setPublicMdBlogs(JSON.parse(pub));
                        setPrivateMdBlogs(JSON.parse(pri));
                    }
                    else {
                        getMetadataBlogs(); 
                    }
                }
            });
        }
    }, [publicMdBlogs, privateMdBlogs]);

    return (
        <div className="main-container">
            <div className="header myblogs">
                <b>Your Blogs</b>   
            </div>
            <PPTabs 
                public={
                    <div className="blog-container">
                {loading ? <LoadingCard/> : 
                    (
                        blogs && blogs.public?.length > 0 ? (blogs.public.map((blog, index) => {
                            return (
                                <BlogCard 
                                    key={index} title={blog.title} 
                                    content={blog.content} author={blog.author} 
                                    mode={blog.mode} hash={blog.hash} date={blog.date}
                                    id={blog.id}
                                />
                            );
                        })) : (
                            <div style={{ fontSize: "24px", width: "100%", marginLeft: "40%", }} >
                                <p>No blogs yet</p>
                                <Button type="primary" onClick={navigateNewBlog}>Create new</Button>
                            </div>
                        )
                    )
                }
            </div>
                }
                private = {
                    <div className="blog-container">
                {loading ? <LoadingCard/> : 
                    (
                        blogs && blogs.private?.length > 0 ? (blogs.private.map((blog, index) => {
                            return (
                                <BlogCard 
                                    key={index} title={blog.title} 
                                    content={blog.content} author={blog.author} 
                                    mode={blog.mode} hash={blog.hash} date={blog.date}
                                    id={blog.id}
                                />
                            );
                        })) : (
                            <div style={{ fontSize: "24px", width: "100%", marginLeft: "40%", }} >
                                <p>No blogs yet</p>
                                <Button type="primary" onClick={navigateNewBlog}>Create new</Button>
                            </div>
                        )
                    )
                }
            </div>
                }
            />
        </div>
    );
}


export default MyBlogs;