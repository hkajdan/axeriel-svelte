import { author } from "./author";
import { blog } from "./blog";
import { blogIndex } from "./blog-index";
import { product } from "./product";
import { footer } from "./footer";
import { homePage } from "./home-page";
import { navbar } from "./navbar";
import { page } from "./page";
import { settings } from "./settings";
import { offer } from "./offer";
import { uiStrings } from "./ui-strings";

export const singletons = [homePage, blogIndex, settings, footer, navbar, uiStrings];

export const documents = [blog, page, product, author, offer, ...singletons];
