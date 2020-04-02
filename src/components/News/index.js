import React, { useState, useEffect } from 'react';
import { Card, CardDeck } from 'react-bootstrap';

export default function News() {
    const [data, setData] = useState([]);
    const [stock, setStock] = useState(''); 

    const getNews = async query => {
        const response = await fetch(`/news/top/${query}`);
        const data = await response.json();
        console.log(data)
        setData(data.articles);
    }
    
    useEffect(() => {
        const query = 'bitcoin';
        getNews(query);
    }, []);

    return (
        <><br/>
        <h4>News</h4><br/>
            <CardDeck>
                {data
                .filter((i, index) => (index < 3))
                .map(article => (
                    <Card>
                        <Card.Img variant="top" src={article.urlToImage} style={{width:'100%',height:'50%'}}/>
                        <Card.Body style={{ overflow:'hidden'}}>
                        <Card.Title style={{fontSize:'1rem', color:'black'}}>{article.title}</Card.Title>
                        <Card.Text style={{fontSize:'0.8rem', color:'black'}}>
                            {`${article.description.slice(0, 100)}... `}
                            <Card.Link href={article.url}>Link To Article</Card.Link>
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">
                                {new Date(article.publishedAt).toLocaleString([], { year: 'numeric', month: 'long', day: 'numeric' })}
                            </small>
                        </Card.Footer>
                    </Card> 
                ))}
            </CardDeck><br/>
        </>
      )
}