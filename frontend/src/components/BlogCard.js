import { Card } from 'antd';
import {UserOutlined, CalendarOutlined} from '@ant-design/icons'
import './BlogCard.css'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
const config = require('../config.json');
const moment = require('moment-timezone');

function BlogCard ({ content, title, author, date, mode, hash, id}){
    
    const authorLen = String(author).length
    const trimmedAuthor = authorLen > 20 ? author.substring(0, 12) + '......' + author.substring(authorLen-11, authorLen-1): author;
    const trimmedContent = String(content).length > 30 ? content.substring(0, 80) + '...' : content+'...';
    const localDate = date ? moment(date).tz(config.TIMEZONE).format('YYYY-MM-DD HH:mm') : '';
    const navigate = useNavigate();
  
    async function clickHandler() {
        if (id == undefined || id == null) {
            navigate(`/blog/${hash}/${mode}`); 
        }
        else {
            navigate(`/blog/${hash}/${mode}/${id}`);
        }
    }


    return (
        <Card
            className='card'
            title={title ?? 'Untitle'}
            bordered={true}
            hoverable
            onClick={clickHandler}
        >
            <p><span><UserOutlined/></span>{trimmedAuthor}</p>
            <p><span><CalendarOutlined/></span>{localDate}</p>
            <p>{trimmedContent}</p>
        </Card>
)};
export default BlogCard;