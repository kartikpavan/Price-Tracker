import mongoose from "mongoose";

interface IProductDocument {
  url: string;
  productTitle: string;
  currency: string;
  image: string;
  currentPrice: number;
  originalPrice: number;
  discountRate: number;
  reviewCount: number;
  stars: number;
  category: string;
  priceHistory: Array<{ price: number; date: Date }>;
  lowesetPrice: number;
  highestPrice: number;
  averagePrice: number;
  isOutofStock: boolean;
  users: Array<{ email: string }>;
  default?: Array<null>;
}

const productSchema = new mongoose.Schema<IProductDocument>(
  {
    url: {
      type: String,
      required: true,
      unique: true,
    },
    currency: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    productTitle: {
      type: String,
      required: true,
    },
    currentPrice: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    discountRate: {
      type: Number,
      required: true,
    },
    reviewCount: {
      type: Number,
    },
    stars: {
      type: Number,
    },
    priceHistory: [
      {
        price: { type: Number, required: true },
        date: { type: Date, required: Date.now },
      },
    ],
    lowesetPrice: { type: Number },
    highestPrice: { type: Number },
    averagePrice: { type: Number },
    category: { type: String },
    isOutofStock: { type: Boolean },
    users: [{ email: { type: String, required: true } }],
    default: [],
  },
  { timestamps: true }
);

// if model exist use that , otherwise define a new Model to avoid compile time errors
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
