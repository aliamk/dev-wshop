import styles from "../styles/Home.module.css";
import Link from "next/link";
import { sanityClient, PortableText, serializers } from "../sanity";
import { urlFor } from "../sanity";

const Home = ({ devWorldPosts }) => {
  // Add the homepage title and description at top of page
  const devWorldPostsZero = devWorldPosts[0];

  // Add the dynamic posts (any schema property that isn't at index 0)
  const devWorldPostsFiltered = devWorldPosts.filter((item) => {
    return item.id !== 0;
  });

  return (
    <main className={styles.main}>
      <div className={styles.page_introduction}>
        <h1 className={styles.title}>
          {devWorldPostsZero.pageTitle}
          {/* <a href="https://nextjs.org"></a> */}
        </h1>
        <PortableText
          key={devWorldPostsZero._id}
          blocks={devWorldPostsZero.pageIntroduction}
          serializers={serializers}
        />
      </div>

      {devWorldPostsFiltered && (
        <div className={styles.feed}>
          {devWorldPostsFiltered.map((devWorldPost, index) => (
            <div className={styles.card} key={index}>
              <Link href={`dev-world-posts/${devWorldPost.slug.current}`}>
                <div key={devWorldPost._id} className={styles.post}>
                  <h3 className={styles.page_title}>
                    {devWorldPost.pageTitle}
                  </h3>
                  <img
                    className={styles.main_image}
                    src={urlFor(devWorldPost.mainImage).width(400).fit("clip")}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export const getServerSideProps = async () => {
  const query = `*[ _type == "page"] | order(id)`;
  const devWorldPosts = await sanityClient.fetch(query);

  if (!devWorldPosts.length) {
    return {
      props: {
        devWorldPosts: [],
      },
    };
  } else {
    return {
      props: {
        devWorldPosts,
      },
    };
  }
};

export default Home;
