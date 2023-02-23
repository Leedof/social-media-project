import styles from "./ProfileBody.module.scss";
import facebookIcon from "../../../../assets/Icons/profile/socials/facebook.svg";
import githubIcon from "../../../../assets/Icons/profile/socials/github.svg";
import instagramIcon from "../../../../assets/Icons/profile/socials/instagram.svg";
import mainlinkIcon from "../../../../assets/Icons/profile/socials/mainlink.svg";
import twitterIcon from "../../../../assets/Icons/profile/socials/twitter.svg";
import vkIcon from "../../../../assets/Icons/profile/socials/vk.svg";
import websiteIcon from "../../../../assets/Icons/profile/socials/website.svg";
import youtubeIcon from "../../../../assets/Icons/profile/socials/youtube.svg";

const contactItems = {
  facebook: {
    title: "Facebook",
    img: facebookIcon,
  },
  github: {
    title: "GitHub",
    img: githubIcon,
  },
  instagram: {
    title: "Instagram",
    img: instagramIcon,
  },
  mainLink: {
    title: "MainLink",
    img: mainlinkIcon,
  },
  twitter: {
    title: "Twitter",
    img: twitterIcon,
  },
  vk: {
    title: "VK",
    img: vkIcon,
  },
  website: {
    title: "Website",
    img: websiteIcon,
  },
  youtube: {
    title: "YouTube",
    img: youtubeIcon,
  },
};

const ProfileBody = ({ contacts }) => {
  //Helper function
  const createContactItems = () => {
    let items = [];

    Object.keys(contacts).forEach((item) => {
      if (contacts[item]) {
        items.push(
          <a
            href={contacts[item]}
            key={item}
            target="_blank"
            rel="noreferrer"
            className={styles.item}
          >
            <img src={contactItems[item].img} alt="social media icon" />
            <div>{contactItems[item].title}</div>
          </a>
        );
      }
    });

    return items.length === 0 ? <span>Nothing is here</span> : items;
  };

  return (
    <div className={styles.body}>
      <section className={styles.contacts}>
        <h2 className={styles.title}>Contact me:</h2>
        <div className={styles.items}>{createContactItems()}</div>
      </section>
    </div>
  );
};

export default ProfileBody;
