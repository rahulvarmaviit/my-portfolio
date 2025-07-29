import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CommentsSection = ({ comments: initialComments, onAddComment }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - commentTime) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const comment = {
        id: Date.now(),
        author: 'Current User',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        content: newComment.trim(),
        timestamp: new Date(),
        likes: 0,
        isLiked: false
      };

      setComments(prev => [comment, ...prev]);
      setNewComment('');
      
      if (onAddComment) {
        await onAddComment(comment);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeComment = (commentId) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          }
        : comment
    ));
  };

  return (
    <div className="bg-card rounded-card p-6 shadow-soft">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-heading-semibold text-xl text-foreground">
            Comments & Questions
          </h3>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="MessageCircle" size={16} />
            <span className="font-caption">{comments.length} comments</span>
          </div>
        </div>

        {/* Add Comment Form */}
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <Input
            type="text"
            placeholder="Ask a question or leave an encouraging message..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="default"
              size="sm"
              disabled={!newComment.trim()}
              loading={isSubmitting}
              iconName="Send"
              iconPosition="left"
            >
              Post Comment
            </Button>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {comments.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="MessageCircle" size={48} className="text-muted-foreground mx-auto mb-3" />
              <h4 className="font-body font-body-medium text-foreground mb-2">
                No comments yet
              </h4>
              <p className="font-caption text-muted-foreground">
                Be the first to ask a question or leave an encouraging message!
              </p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-card">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {comment.avatar ? (
                    <Image
                      src={comment.avatar}
                      alt={comment.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} className="text-primary" />
                    </div>
                  )}
                </div>

                {/* Comment Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-body font-body-medium text-foreground">
                      {comment.author}
                    </h4>
                    <span className="font-caption text-muted-foreground">
                      {formatTimeAgo(comment.timestamp)}
                    </span>
                  </div>

                  <p className="font-body text-foreground mb-3">
                    {comment.content}
                  </p>

                  {/* Comment Actions */}
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLikeComment(comment.id)}
                      className={`flex items-center space-x-1 transition-gentle ${
                        comment.isLiked
                          ? 'text-primary' :'text-muted-foreground hover:text-primary'
                      }`}
                    >
                      <Icon 
                        name={comment.isLiked ? "Heart" : "Heart"} 
                        size={14} 
                        className={comment.isLiked ? "fill-current" : ""} 
                      />
                      <span className="font-caption">
                        {comment.likes > 0 ? comment.likes : 'Like'}
                      </span>
                    </button>

                    <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-gentle">
                      <Icon name="MessageCircle" size={14} />
                      <span className="font-caption">Reply</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Guidelines */}
        <div className="bg-muted/50 rounded-card p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-muted-foreground mt-1" />
            <div>
              <h4 className="font-body font-body-medium text-foreground mb-2">
                Community Guidelines
              </h4>
              <ul className="space-y-1 font-caption text-muted-foreground">
                <li>• Be respectful and supportive</li>
                <li>• Ask relevant questions about the campaign</li>
                <li>• Share encouraging messages for the beneficiary</li>
                <li>• Avoid spam or promotional content</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;