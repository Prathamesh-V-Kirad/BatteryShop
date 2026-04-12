export type Testimonial = {
  name: string;
  role: string;
  text: string;
  relative_time_description: string;
  img: string;
  rating: number;
};
export const testimonials: Testimonial[] = [
{
    name: "Shishir Suhane",
    role: "Local Guide",
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF02Jj8T2t7PdkytAw42HDuuSz7yXguKn8Lg&s",
    rating:5,
    relative_time_description: "a month ago",
    text: "What an amazing service by the owner himself, I am just WoW! I am staying in Koparkhairane. I wanted to change the inverter and its battery. The owner has really guided me with the best selection of the battery and the inverter for my home.I am really satisfied with their service. It was an overwhelming service I have received, hence writing the review.",
  },
  {
    name: "Mudit Awasti",
    role: "Customer",
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF02Jj8T2t7PdkytAw42HDuuSz7yXguKn8Lg&s",
    rating:5,
    relative_time_description: "a month ago",
    text: "Best in Navi Mumbai, I recommend evryone to go at National Battery only.",
  },
  {
    name: "Shahzad Malik",
    role: "Customer",
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF02Jj8T2t7PdkytAw42HDuuSz7yXguKn8Lg&s",
    rating:5,
    relative_time_description: "a month ago",
    text: "Excellent service 👍.",
  },
  
  {
    name: "Anup Sharma",
    role: "Customer",
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF02Jj8T2t7PdkytAw42HDuuSz7yXguKn8Lg&s",
    rating:5,
    relative_time_description: "a month ago",
    text: "All battery service",
  }
]