import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class news extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
    totalResults: 0,
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsFeed`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const api = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&Page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(api);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  // previousPage = async () => {
  //   // let api = `https://newsapi.org/v2/top-headlines?country=${
  //   //   this.props.country
  //   // }&category=${
  //   //   this.props.category
  //   // }&apiKey=${this.props.apiKey}&Page=${
  //   //   this.state.page - 1
  //   // }&pageSize=${this.props.pageSize}`;
  //   // this.setState({ loading: true });
  //   // let data = await fetch(api);
  //   // let parsedData = await data.json();
  //   // this.setState({ articles: parsedData.articles });
  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   articles: parsedData.articles,
  //   //   loading: false,
  //   // });
  //   this.setState({page: this.state.page -1})
  //   this.updateNews()
  // };
  // nextPage = async () => {
  //   // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / 20))) {
  //   // }
  //   // let api = `https://newsapi.org/v2/top-headlines?country=${
  //   //   this.props.country
  //   // }&category=${
  //   //   this.props.category
  //   // }&apiKey=${this.props.apiKey}&Page=${
  //   //   this.state.page + 1
  //   // }&pageSize=${this.props.pageSize}`;
  //   // this.setState({ loading: true });
  //   // let data = await fetch(api);
  //   // let parsedData = await data.json();
  //   // this.setState({ articles: parsedData.articles });
  //   // this.setState({
  //   //   page: this.state.page + 1,
  //   //   articles: parsedData.articles,
  //   //   loading: false,
  //   // });
  //   this.setState({page: this.state.page +1})
  //   this.updateNews()
  // };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const api = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&Page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(api);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <div className="my-5">
        <p className="text-center my-5">
          <h1>
            News Feed - Top{" "}
            <span className="text-danger">
              {this.capitalizeFirstLetter(this.props.category)}
            </span>{" "}
            Headlines{" "}
          </h1>
        </p>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row ">
              {this.state.articles.map((el) => {
                return (
                  <div className="col-md-4 col-sm-1 my-3" key={el.url}>
                    <NewsItem
                      title={el.title ? el.title.slice(0, 30) : ""}
                      descreption={
                        el.description ? el.description.slice(0, 40) : ""
                      }
                      imageUrl={el.urlToImage}
                      newsUrl={el.url}
                      date={el.publishedAt}
                      author={el.author}
                      source={el.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex border justify-content-between align-items-center py-2">
          <button
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.previousPage}
          >
            &larr; Previous
          </button>
          <span className="fs-3 font-bold">Page:-{this.state.page}</span>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.nextPage}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  }
}

export default news;
