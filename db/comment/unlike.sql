DELETE FROM like_comment
WHERE comment_id = $1
AND user_id = $2;