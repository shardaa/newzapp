import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class news extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
    };
  }

  async componentDidMount() {
    // let api = `https://newsapi.org/v2/top-headlines?country=in&apiKey=603bb6a0a9764b8088deafc74ef4b4cf&Page=${this.state.page}`;
    let api =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=603bb6a0a9764b8088deafc74ef4b4cf&Page=1&pageSize=20";
    let data = await fetch(api);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }

  previousPage = async () => {
    let api = `https://newsapi.org/v2/top-headlines?country=in&apiKey=603bb6a0a9764b8088deafc74ef4b4cf&Page=${
      this.state.page - 1
    }&pageSize=20`;
    let data = await fetch(api);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles });
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
    });
  };
  nextPage = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
    } else {
      let api = `https://newsapi.org/v2/top-headlines?country=in&apiKey=603bb6a0a9764b8088deafc74ef4b4cf&Page=${
        this.state.page + 1
      }&pageSize=20`;
      let data = await fetch(api);
      let parsedData = await data.json();
      this.setState({ articles: parsedData.articles });
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
      });
    }
  };

  render() {
    return (
      <div className="container my-5">
        <h1>News Feed</h1>
        <div className="row ">
          {this.state.articles.map((el) => {
            return (
              <div className="col-md-4 col-sm-1 my-3" key={el.url}>
                <NewsItem
                  title={el.title ? el.title.slice(0, 30) : ""}
                  descreption={
                    el.description ? el.description.slice(0, 88) : ""
                  }
                  imageUrl={el.urlToImage}
                  newsUrl={el.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex border justify-content-between align-items-center py-2">
          <button
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.previousPage}
          >
            &larr; Previous
          </button>
          <span className="fs-3 font-bold">Page:- 1</span>
          <button className="btn btn-dark" onClick={this.nextPage}>
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default news;
