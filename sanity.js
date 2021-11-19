// CREATE THE SANITY CLIENT
import {
  createClient,
  createPreviewSubscriptionHook,
  createImageUrlBuilder,
  createPortableTextComponent,
} from "next-sanity";

const config = {
  /**
   * Find your project ID and dataset in `sanity.json` in your studio project.
   * These are considered “public”, but you can use environment variables
   * if you want differ between local dev and production.
   *
   * https://nextjs.org/docs/basic-features/environment-variables
   **/
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === "production",
  apiVersion: "2021-08-31",
  useCdn: false,
  /**
   * Set useCdn to `false` if your application require the freshest possible
   * data always (potentially slightly slower and a bit more expensive).
   * Authenticated request (like preview) will always bypass the CDN
   **/
};

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config);

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const urlFor = (source) => createImageUrlBuilder(config).image(source);

// To use the block text type
export const PortableText = createPortableTextComponent({
  ...config,
  serializers: {},
});

// To render internal and external links within PortableText blocks
export const serializers = {
  marks: {
    internalLink: ({ mark, children }) => {
      const { slug = {} } = mark;
      const href = `/dev-world-posts/${slug.current}`;
      return <a href={href}>{children}</a>;
    },
    link: ({ mark, children }) => {
      const { blank, href } = mark;
      return blank ? (
        <a href={href} target="_blank" rel="noreferrer">
          {children}
        </a>
      ) : (
        <a href={href}>{children}</a>
      );
    },
  },
};
