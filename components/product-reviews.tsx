"use client";

import { useState } from "react";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

// Sample review data
const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    date: "March 15, 2025",
    rating: 5,
    review:
      "This overshirt is exactly what I was looking for. The quality is excellent and the fit is perfect. I'm usually between sizes and went with the larger one, which gives me the relaxed look I wanted. Highly recommended!",
  },
  {
    id: 2,
    name: "Michael T.",
    date: "March 10, 2025",
    rating: 4,
    review:
      "Great shirt with excellent quality fabric. The only reason I'm giving it 4 stars instead of 5 is that the color is slightly different than shown in the photos. Still very happy with my purchase.",
  },
  {
    id: 3,
    name: "Elena K.",
    date: "February 28, 2025",
    rating: 5,
    review:
      "Incredible quality and attention to detail. This is my third purchase from Vanguard and they never disappoint. The cotton is so soft and the stitching is impeccable. Worth every penny.",
  },
];

export default function ProductReviews() {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div>
      {/* Review Summary */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex items-baseline gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.round(averageRating)
                    ? "fill-primary text-primary"
                    : "text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-lg font-medium">{averageRating.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">({reviews.length} reviews)</span>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="sm:ml-auto"
        >
          {showReviewForm ? "Cancel Review" : "Write a Review"}
        </Button>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="mb-8 rounded-lg border bg-card p-6">
          <h3 className="mb-4 text-lg font-medium">Write Your Review</h3>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Rating</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1"
                >
                  <Star
                    className={`h-6 w-6 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? "fill-primary text-primary"
                        : "text-muted"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Your email"
              />
            </div>
            <div>
              <label htmlFor="review" className="mb-2 block text-sm font-medium">
                Review
              </label>
              <Textarea
                id="review"
                placeholder="Share your experience with this product"
                className="resize-none"
                rows={4}
              />
            </div>
            <Button>Submit Review</Button>
          </div>
        </div>
      )}

      {/* Review List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id}>
            <div className="mb-2 flex items-baseline justify-between">
              <h4 className="font-medium">{review.name}</h4>
              <span className="text-sm text-muted-foreground">{review.date}</span>
            </div>
            <div className="mb-2 flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= review.rating
                      ? "fill-primary text-primary"
                      : "text-muted"
                  }`}
                />
              ))}
            </div>
            <p className="text-muted-foreground">{review.review}</p>
            <Separator className="mt-6" />
          </div>
        ))}
      </div>
    </div>
  );
}