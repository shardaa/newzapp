import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, descreption, imageUrl, newsUrl } = this.props;
    return (
      <div>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={
              !imageUrl
                ? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fbootstrap.news%2Fdemos%2F&psig=AOvVaw29RLMv-sdwNTLemDUp0UfY&ust=1631458517231000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPDB9ceV9_ICFQAAAAAdAAAAABAD"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{descreption}...</p>
            <a
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-primary"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
