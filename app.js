// your code here
$(document).ready(function () {
  let currentUserId = 1;

  fetchUserData(currentUserId);
  fetchPosts(currentUserId);
  fetchTodos(currentUserId);

  function fetchUserData(userId) {
    $.ajax({
      url: `https://dummyjson.com/users/${userId}`,
      method: "GET",
      success: function (user) {
        displayUserInfo(user);
      },
      error: function () {
        alert("Failed to get user information");
      },
    });
  }

  function displayUserInfo(user) {
    $(".info__image img").attr("src", user.image);
    $(".info__content").html(`
      <h2>${user.firstName} ${user.lastName}</h2>
      <p>Age: ${user.age}</p>
      <p>Email: ${user.email}</p>
      <p>Phone: ${user.phone}</p>
    `);
    $(".posts h3").text(`${user.firstName}'s Posts`);
    $(".posts h3")
      .off("click")
      .on("click", function () {
        $(this).next("ul").slideToggle();
      });
    $(".todos h3").text(`${user.firstName}'s ToDos`);
    $(".todos h3")
      .off("click")
      .on("click", function () {
        $(this).next("ul").slideToggle();
      });
  }
  $("header button:first-child").on("click", function () {
    currentUserId = currentUserId === 1 ? 30 : currentUserId - 1;
    updateUserContent();
  });
  $("header button:last-child").on("click", function () {
    currentUserId = currentUserId === 30 ? 1 : currentUserId + 1;
    updateUserContent();
  });

  function updateUserContent() {
    fetchUserData(currentUserId);
    fetchPosts(currentUserId);
    fetchTodos(currentUserId);
  }

  function fetchPosts(userId) {
    $.ajax({
      url: `https://dummyjson.com/users/${userId}/posts`,
      method: "GET",
      success: function (data) {
        displayPosts(data.posts);
      },
      error: function () {
        alert("Failed to get user posts");
      },
    });
  }

  function displayPosts(posts) {
    $(".posts ul").empty();
    if (posts.length === 0) {
      $(".posts ul").append($("<li>").text("User has no posts"));
    } else {
      posts.forEach((post) => {
        const postItem = $("<li>")
          .html(
            `
            <h4>${post.title}</h4>
            <p>${post.body}</p>
            `
          )
          .on("click", function () {
            openModal(post.id);
          });
        $(".posts ul").append(postItem);
      });
    }
  }

  function fetchTodos(userId) {
    $.ajax({
      url: `https://dummyjson.com/users/${userId}/todos`,
      method: "GET",
      success: function (data) {
        displayTodos(data.todos);
      },
      error: function () {
        alert("Failed to get user To Dos");
      },
    });
  }

  function displayTodos(todos) {
    const todoList = $(".todos ul");
    todoList.empty();
    if (todos.length === 0) {
      $(".todos ul").append($("<li>").text("User has no todos"));
    } else {
      todos.forEach((todo) => {
        const todoItem = $("<li>").text(`${todo.todo}`);
        todoList.append(todoItem);
      });
    }
  }
});

function openModal(postId) {
  $.ajax({
    url: `https://dummyjson.com/posts/${postId}`,
    method: "GET",
    success: function (post) {
      const modal = $(`
        <div class = overlay>
          <div class = "modal">
           <h3>${post.title}</h3>
            <p>${post.body}</p>
            <p>Views: ${post.views}</p>
            <button id = closeModal>Close Modal</button>
          </div>
        </div>
        `);
      $("body").append(modal);
      $("#closeModal").on("click", function () {
        $(".overlay").remove();
      });
    },
  });
}
