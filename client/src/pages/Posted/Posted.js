import React, { Component } from "react";
import "./Posted.css";
import SubmitComment from "../../components/SubmitComment";
import CommentBox from "../../components/CommentBox";
import ShredPlayer from "../../components/ShredPlayer";
import API from "../../utils/API";

class Posted extends Component {

    startingMatrix = [
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
    ]

    state = {
        user_id: "Person",
        matrix: this.startingMatrix,
        comments: [{user: "Joe", body: "This is amazing! But it's no Cookie Clicker. :'("}, {user: "JR", body: "I might've done things a little differently, but it's not too bad."}, {user: "Zack", body: "I'm sad I got a job because this is so awesome!"}]
    }

    componentDidMount() {
        this.getPostShred();
    }

    getPostShred = (id) => {
        API.getPostShred(id)
            .then(res => {
                console.log(res.data);
                this.setState({matrix: res.data})
            })
            .catch(err => console.log(err));
    }

    walkieTalkie = matrix => {
        this.setState({matrix: matrix});
    }

    upvote = (id, votes) => {
        let newVotes = votes + 1;
        API.vote(newVotes, id)
            .then(console.log("upvoted #" + id))
            .catch(err => console.log(err));
    }

    downvote = (id, votes) => {
        let newVotes = votes - 1;
        API.vote(newVotes, id)
        .then(console.log("downvoted #" + id))
        .catch(err => console.log(err));

    }

    render(){
        return (
            <>
            <div className="container">
                <h2>{this.state.user_id}'s Shred</h2>
                <div className="row">
                    <div className="col s12">
                    <ShredPlayer
                        walkieTalkie={this.walkieTalkie}
                        matrix={this.state.matrix}
                        id={this.state.user_id}
                    />
                    </div>
                </div>
            </div>

            <div>
                <SubmitComment />
            </div>
            <div>
                {this.state.comments.length ? (
                    this.state.comments.map(comment => (
                        <CommentBox
                        username={comment.user}
                        comment={comment.body}
                        />
                    ))
                    ) : (
                    <h3>No comments have been posted yet!</h3>
                )}
            </div>
            </>
        )
    }
}

export default Posted;