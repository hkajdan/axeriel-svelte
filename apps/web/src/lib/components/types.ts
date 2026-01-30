import type {
  Hero,
  Cta,
  FeatureCardsIcon,
  ProductList,
  ImageLinkCards,
  SubscribeNewsletter,
  StatList,
  LogoList,
  Timeline,
  TextImage,
  Carousel,
  JobOffers,
  VideoSection,
  Histogram,
  PageBuilder
} from '$lib/sanity/sanity.types';

export type BlockComponentProps =
  | Hero
  | Cta
  | FeatureCardsIcon
  | ProductList
  | ImageLinkCards
  | SubscribeNewsletter
  | StatList
  | LogoList
  | Timeline
  | TextImage
  | Carousel
  | JobOffers
  | VideoSection
  | Histogram;

export type BlockComponentMap = {
  [K in BlockComponentProps['_type']]: () => Promise<{ default: any }>;
};

export interface PageBuilderProps {
  pageBuilder: PageBuilder;
}

export interface BlockErrorProps {
  blockType: string;
  error?: Error;
}