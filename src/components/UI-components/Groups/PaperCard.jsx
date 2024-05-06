import React from "react";
import Card from 'react-bootstrap/Card';

function PaperCard({ArticleTitle,Authors,Year}) {
  return (
    <Card className="m-3">
      <Card.Body>
        <Card.Title>{ArticleTitle}</Card.Title>
        <Card.Text>
          {Authors}
        </Card.Text>
        <Card.Text>
          {Year}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PaperCard;