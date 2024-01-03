import { Card } from 'antd';
import './BlogCard.css'

function LoadingCard(){

    return (
        <>  
            <Card
                className='card' loading={true}
                bordered={true} hoverable
            ></Card>
            <Card
                className='card' loading={true}
                bordered={true} hoverable
            ></Card>
            <Card
                className='card' loading={true}
                bordered={true} hoverable
            ></Card>
            <Card
                className='card' loading={true}
                bordered={true} hoverable
            ></Card>
        </>    
)};
export default LoadingCard;