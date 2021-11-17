import { sanityClient, PortableText, serializers } from "../../sanity";
import Image from "../../components/Image";

const pageQuery = `*[_type == "page" && slug.current == $slug][0]{
    pageTitle,
    slug,
    id,
    pageIntroduction,
    mainImage,
    captionedImages,
    imageGallery,
    extraInformation
  }`;

const devWorldPost = ({ data }) => {
  const { devWorldPosts } = data;

  return (
    <>
      <div className="main_container">
        <h1>{devWorldPosts.pageTitle}</h1>
        <div className="main_image_container">
          <PortableText
            blocks={devWorldPosts.pageIntroduction}
            className="intro"
          />
          {/* <Image
            identifier="main-image"
            image={devWorldPosts.mainImage}
            alt=""
          /> */}
        </div>
        {devWorldPosts.captionedImages && (
          <div className="guide_images">
            {devWorldPosts.captionedImages.map(
              ({ _key, asset, topCaption }, image) => (
                <div key={_key} className="guide_image">
                  <PortableText blocks={topCaption} />
                  <Image key={_key} identifier="image" image={asset} alt="" />
                </div>
              )
            )}
          </div>
        )}
        <PortableText
          blocks={devWorldPosts.extraInformation}
          className="extraInformation"
          serializers={serializers}
        />
        {devWorldPosts.imageGallery && (
          <div className="image_gallery_container"></div>
        )}
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == "page" && defined(slug.current)]{
        "params": {
          "slug": slug.current
        }
      }`
  );
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const devWorldPosts = await sanityClient.fetch(pageQuery, { slug });
  return { props: { data: { devWorldPosts }, preview: true } };
}

export default devWorldPost;