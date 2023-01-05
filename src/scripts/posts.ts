interface IPost {
  date: string;
  theme: string;
  title: string;
  text: string;
  jpgImg: string;
  webpImg: string;
}

const posts: IPost[] = [
  {
    date: "JAN 4, 2016",
    theme: "In Culture",
    title: "POST-3",
    text: " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam, laudantium nulla velit aliquam doloribus veniam consequatur? Culpa, suscipit dolor aperiam ea voluptatum voluptas doloribus nihil quasi earum quo facere officia? \n  Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, eveniet!",
    jpgImg: "img/feat-1.jpg",
    webpImg: "img/feat-1.webp",
  },
  {
    date: "JAN 4, 2016",
    theme: "In Culture",
    title: "POST-4",
    text: " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam, laudantium nulla velit aliquam doloribus veniam consequatur? Culpa, suscipit dolor aperiam ea voluptatum voluptas doloribus nihil quasi earum quo facere officia? \n  Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, eveniet!",
    jpgImg: "img/feat-2.jpg",
    webpImg: "img/feat-2.webp",
  },
  {
    date: "JAN 4, 2016",
    theme: "In Culture",
    title: "POST-5",
    text: " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam, laudantium nulla velit aliquam doloribus veniam consequatur? Culpa, suscipit dolor aperiam ea voluptatum voluptas doloribus nihil quasi earum quo facere officia? \n  Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, eveniet!",
    jpgImg: "img/feat-1.jpg",
    webpImg: "img/feat-1.webp",
  },
  {
    date: "JAN 4, 2016",
    theme: "In Culture",
    title: "POST-6",
    text: " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam, laudantium nulla velit aliquam doloribus veniam consequatur? Culpa, suscipit dolor aperiam ea voluptatum voluptas doloribus nihil quasi earum quo facere officia? \n  Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, eveniet!",
    jpgImg: "img/feat-2.jpg",
    webpImg: "img/feat-2.webp",
  },
];

function generatePostTemplate(post: IPost): string {
  const sep = post.text.indexOf("\n");
  const firstP = post.text.substring(0, sep);
  const secondP = post.text.substring(sep, post.text.length - 1);
  return `
    <div class="features-post post" data-post="post">
        <div class="post-content">
            <p class="post-date">
            <span>${post.date}</span><span>${post.theme}</span>
            </p>
            <h4 class="post-title subtitle">${post.title}</h4>
            <p class="post-text text">
            ${firstP}
            </p>
            <p class="post-text text">
            ${secondP}
            </p>
        </div>
        <div class="post-picture">
            <picture>
            <source srcset="${post.webpImg}" type="image/webp" />
            <img 
            src="${post.jpgImg}"
            alt="${post.title.toLowerCase()} image!" 
            />
            </picture>
        </div>
    </div>
    `;
}

function postCount() {
  let count = 0;

  return {
    add: function () {
      count = count + 2;
      return count;
    },
    reset: function () {
      count = 0;
    },
    value: function () {
      return count;
    },
  };
}

function showPosts(container: Element, postList: IPost[]) {
  container.insertAdjacentHTML(
    "beforeend",
    postList
      .map((post: IPost): string => {
        return generatePostTemplate(post);
      })
      .join("")
  );
}

function hidePosts(container: Element) {
  const postsToRemove = document.querySelectorAll("div[data-post]");

  for (let i = 0; i < postsToRemove.length; i++) {
    container.removeChild(postsToRemove[i]);
  }
}

function postsInit() {
  const btn: HTMLButtonElement = document.querySelector(".posts-button");
  const postsContainer = document.querySelector(".posts-wrapper");
  const count = postCount();

  const btnShowText = "Показать ещё";
  const btnHideText = "Скрыть посты";

  function btnHandler() {
    if (btn.innerText === btnHideText) {
      count.reset();
      hidePosts(postsContainer);

      btn.innerText = btnShowText;
      postsContainer.scrollIntoView();
    } else {
      const twoPosts = posts.slice(count.value(), count.add());
      if (count.value() >= posts.length) {
        btn.innerText = btnHideText;
      }
      showPosts(postsContainer, twoPosts);
    }
  }

  btn.addEventListener("click", btnHandler);
}
