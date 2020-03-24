import React, { useState, useEffect } from 'react';
import { Card, CardDeck } from 'react-bootstrap';

export default function News() {
    const [data, setData] = useState([]);
    const [stock, setStock] = useState(''); 

    const getNews = async query => {
        const response = await fetch(`/api/v1/news/top/${query}`);
        const data = await response.json();
        console.log(data)
        setData(data.articles);
    }
    
    useEffect(() => {
        const query = 'bitcoin';
        getNews(query);
    }, []);

    return (
        <>
            <CardDeck>
                {data
                .filter((i, index) => (index < 3))
                .map(article => (
                    <Card>
                        <Card.Img variant="top" src={article.urlToImage} />
                        <Card.Body>
                        <Card.Title>{article.title}</Card.Title>
                        <Card.Text>
                            {`${article.description.slice(0, 100)} ...`}
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">
                                {new Date(article.publishedAt).toLocaleString([], { year: 'numeric', month: 'long', day: 'numeric' })}
                            </small>
                        </Card.Footer>
                    </Card> 
                ))}
            </CardDeck>
        </>
      )
}