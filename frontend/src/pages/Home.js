import "./Home.css";
import { useEffect, useMemo, useState } from "react";
import BlogCard from "../components/BlogCard";
import LoadingCard from "../components/LoadingCard";
import { getContract } from "../ultils/Contract";
import { getMetadata } from "../ultils/IPFS";
import LeftBar from "../components/LeftBar";
import { Input, Space } from 'antd';
const { Search } = Input;


function Home() {
    const [loading, setLoading] = useState(true);
    const [metadataBlogs, setMetadataBlogs] = useState();
    const [blogs, setBlogs] = useState();
    const [search, setSearch] = useState("");

    console.log('this is home');
    LeftBar({currTab: ''});
    const filterByName = useMemo(() => {
        if(!blogs){
            return
        }
        const filteredArray = blogs.filter((item) =>
          item?.title.toLowerCase().includes(search.toLowerCase())
        );
        return filteredArray;
      },[search, blogs]) 

    async function getMetadataBlogs() {
        setLoading(true);
        const total = await getContract().totalSupply();
        // console.log(total)
        let metadatas = [];
        for (let i = total-1; i >= 0; i--) {
            const obj = await getContract().visibleTokenURI(i);
            console.log(obj);
            i = obj[1];
            const md = await getMetadata(obj[0]);
            console.log("hihi",md);
            metadatas.push({title: md.title, mode: obj[2], author: md.author, date: md.date, content: md.content, hash: obj[0]})
        }
        
        setMetadataBlogs(metadatas);
        window.sessionStorage.setItem('home_metadatablogs', JSON.stringify(metadatas));
        window.sessionStorage.setItem('home_num', total);
        setLoading(false);
    }

    async function checkNew() {
        return new Promise((resolve, reject) => {
            const total = getContract().totalSupply();
            return resolve(total);
        });
    }

    async function getBlogs() {
        setLoading(true);
        let objs = [];

        for (const mdBlog of metadataBlogs)
            objs.push({title: mdBlog.title, content: mdBlog.content, 
                author: mdBlog.author, date: mdBlog.date, 
                mode: mdBlog.mode, hash: mdBlog.hash});

        setBlogs(objs);
        setLoading(false);
    }

    
    useEffect(() => {
        if (! metadataBlogs) { 
            checkNew().then((total) => {
                const num = window.sessionStorage.getItem('home_num');
                if (num &&  Number.parseInt(num) < total) {
                    getMetadataBlogs(); 
                }
                else {
                    const metadatas = window.sessionStorage.getItem('home_metadatablogs');
                    if ( metadatas ) {
                        setMetadataBlogs(JSON.parse(metadatas));
                    }
                    else {
                        getMetadataBlogs(); 
                    }
                }
            });
    }}, [metadataBlogs]);
    useEffect(() => {
        console.log("blog", blogs)
        if (metadataBlogs && ! blogs) {  
            getBlogs(); 
    
    }}, [metadataBlogs, blogs]);
    const onSearch  = (value, _e, info) => setSearch(value);

    return (
        <div className="main-container">
            <div className="header"><b>Public Blogs</b></div>
            <Search placeholder="Type to search"  onSearch={onSearch} style={{ width: 800, height: 64, marginTop: 16 }}       size="large"
            allowClear
            />
            <div className="blog-container">
                {loading ? <LoadingCard/> : 
                    (   
                        filterByName && filterByName.map((blog, index) => {
                            return (
                                <BlogCard 
                                    key={index} title={blog.title} 
                                    content={blog.content} author={blog.author} 
                                    mode={blog.mode} hash={blog.hash} date = {blog.date}
                                />
                            );
                        })
                    )
                }
            </div>
        </div>
    );
}

export default Home;