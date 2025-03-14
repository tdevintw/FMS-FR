import React from "react";

interface BlogCardProps {
    image: string;
    date: {
        day: string | number;
        month: string;
    };
    author: string;
    title: string;
    excerpt: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ image, date, author, title, excerpt }) => {
    return (
        <div className="single-blog">
            <div className="single-blog-thumb">
                <a href="blog.html">
                    <img src={image} alt="Blog Image" />
                </a>
            </div>
            <div className="single-blog-content position-relative">
                <div className="post-date text-center border rounded d-flex flex-column position-absolute">
                    <span>{date.day}</span>
                    <span>{date.month}</span>
                </div>
                <div className="post-meta">
                    <span className="author">Author: {author}</span>
                </div>
                <h2 className="post-title">
                    <a href="blog.html">{title}</a>
                </h2>
                <p className="desc-content">{excerpt}</p>
            </div>
        </div>
    );
};

export default BlogCard;
