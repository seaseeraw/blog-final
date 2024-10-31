export const UserComments =({comments})=>{
    return(
        <div>
            {comments.map((comment)=>{
                return(
                    <div className="comment">
<div className="comment-img">
<Image 
style={{width:"50px", height:"auto"}} src="/user.png"
    />
</div>
<div className="inner-comment">{comment.comment}
    <span className="comment-user">
        By:{comment.userid.username}
    </span>
</div>
                    </div>
                )
            })}
        </div>
    )
}