function createBlog(event) {
    event.preventDefault()

    const title = document.getElementById('blog-title').value; 
    const content = document.getElementById('blog-content').value; 
    
    var data = JSON.stringify({
        title,
        content
    });

    console.log(data); 

    var config = {
        method: 'post',
        url: 'https://sistech-api.vercel.app/blog/',
        headers: { 
            'Authorization': 'Bearer 8525d756-d533-4262-abde-722bba98c1b2', 
            'Content-Type': 'application/json'
        },
        data : data
    };
        
    var config = {
        method: 'post',
        url: 'https://sistech-api.vercel.app/blog/',
        headers: { 
          'Authorization': 'Bearer 8525d756-d533-4262-abde-722bba98c1b2', 
          'Content-Type': 'application/json'
        },
        data : data
    };
      
    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert("New Blog Added 😺")        
        window.location.href = "editor.html";
    })
    .catch(function (error) {
        console.log(error);
    });
}

function likeBlog (idBlog) {    
    console.log("like " + idBlog); 
    var data = JSON.stringify({
    "id": idBlog
    });

    var config = {
    method: 'post',
    url: 'https://sistech-api.vercel.app/blog/like',
    headers: { 
        'Authorization': 'Bearer 8525d756-d533-4262-abde-722bba98c1b2', 
        'Content-Type': 'application/json'
    },
    data : data
    };

    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        let like = document.getElementById('like-count-'+idBlog);  
        like.innerHTML = response.data.like; 
        console.log(like); 
    })
    .catch(function (error) {
        console.log(error);
    });
}

function toUpdatePage(id, title, content) {
    sessionStorage.setItem("id", id); 
    sessionStorage.setItem("title", title); 
    sessionStorage.setItem("content", content); 
    window.location.href = "update-blog.html"; 
}

function updateBlog(event) {
    event.preventDefault();
    const id = sessionStorage.getItem("id"); 
        
    console.log("Update Blog " + id); 

    const title = document.getElementById('blog-title').value; 
    const content = document.getElementById('blog-content').value;
    
    var data = JSON.stringify({
        title,
        content,
        id
    });

    console.log(data);

    var config = {
    method: 'put',
    url: 'https://sistech-api.vercel.app/blog/',
    headers: { 
        'Authorization': 'Bearer 8525d756-d533-4262-abde-722bba98c1b2', 
        'Content-Type': 'application/json'
    },
    data : data
    };

    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert("Blog Updated 😺")        
        window.location.href = 'editor.html'; 
    })
    .catch(function (error) {
        console.log(error);
    });
}

function onloadEditor() {
    let div = document.getElementById('blog-in'); 
    div.innerHTML = "<div class='blog-card'><div class='content-holder'>Loading Blog..</div></div>"; 

    let timeout = setTimeout(
        function weit() {
            div.innerHTML = "<div class='blog-card'><div class='content-holder'>Error Loading Blog x-x</div></div>"; 
            return;            
        }, 10000
    ); 

    if(!sessionStorage.getItem('blogs-e')) { 
        listAllBlogEditor();
    } 

    div.innerHTML = sessionStorage.getItem('blogs-e'); 
    clearTimeout(timeout); 
    console.log("onload done :)"); 
}

function listAllBlogEditor() {
    console.log("listing blogs..")
    var data = '';

    var config = {
    method: 'get',
    url: 'https://sistech-api.vercel.app/blog/',
    headers: { 
        'Authorization': 'Bearer 8525d756-d533-4262-abde-722bba98c1b2'
    },
    data : data
    };

    const div = document.getElementById('blog-in'); 
    console.log(div); 
    axios(config)
    .then(function (response) {
        allBlog = response.data; 
        for(let i = 0; i < allBlog.length; i++) {                            
            const blogCard = document.createElement('div');
            blogCard.className = "blog-card"; 

            const contentHolder = document.createElement('div'); 
            contentHolder.className = "content-holder"; 

            const id = allBlog[i].id; 

            const title = document.createElement('h6'); 
            title.className = "title"; 
            title.innerHTML = allBlog[i].title; 
            
            const content = document.createElement('p');                             
            content.innerHTML = allBlog[i].content; 

            const editIcon = document.createElement('i');
            editIcon.className = "ti-pencil edit-icon"; 
            editIcon.setAttribute('onclick','toUpdatePage("' + id + '","' + allBlog[i].title + '","' + allBlog[i].content + '")');
            
            //<a><i class="ti-heart text-danger"></i> <span id="like-count">0</span></a>
            const details = document.createElement('p');                               
            details.className = "post-details";                             
            const heartIcon = document.createElement('i');
            heartIcon.className = "ti-heart like-icon";             
            heartIcon.setAttribute('onclick','likeBlog("' + id + '")');             

            const like = document.createElement('span'); 
            like.innerHTML = allBlog[i].like;          
            like.id = 'like-count-' + id;
            
            const a = document.createElement('a');                                     
            a.append(heartIcon, " ", like); 
            details.append(a); 
                                                                                                                            
            contentHolder.appendChild(title);
            contentHolder.appendChild(content); 
            contentHolder.appendChild(details);             
            contentHolder.appendChild(editIcon);
            
            blogCard.appendChild(contentHolder); 
            
            console.log(blogCard); 
            div.appendChild(blogCard);                 
        } 
        //sessionStorage.setItem('blogs-e', div.innerHTML);        
    })
    .catch(function (error) {        
        console.log(error);
        div.innerHTML = "<div class='blog-card'><div class='content-holder'>Error Loading Blog x-x</div></div>";             
    });
}

function listAllBlog() {
    console.log('Listing All Blog..'); 
    var data = '';

    var config = {
    method: 'get',
    url: 'https://sistech-api.vercel.app/blog/',
    headers: { 
        'Authorization': 'Bearer 8525d756-d533-4262-abde-722bba98c1b2'
    },
    data : data
    };

    const div = document.getElementById('blog-in'); 
    axios(config)
    .then(function (response) {
        allBlog = response.data; 
        for(let i = 0; i < allBlog.length; i++) {                            
            const blogCard = document.createElement('div');
            blogCard.className = "blog-card"; 

            const contentHolder = document.createElement('div'); 
            contentHolder.className = "content-holder"; 

            const id = allBlog[i].id; 

            const title = document.createElement('h6'); 
            title.className = "title"; 
            title.innerHTML = allBlog[i].title; 
            
            const content = document.createElement('p');                             
            content.innerHTML = allBlog[i].content; 
            
            //<a><i class="ti-heart text-danger"></i> <span id="like-count">0</span></a>
            const details = document.createElement('p');                               
            details.className = "post-details";                             
            const heartIcon = document.createElement('i');
            heartIcon.className = "ti-heart";             
            heartIcon.setAttribute('onclick','likeBlog("' + id + '")');             

            const like = document.createElement('span'); 
            like.innerHTML = allBlog[i].like;          
            like.id = 'like-count-' + id;
            
            const a = document.createElement('a');                                     
            a.append(heartIcon, " ", like); 
            details.append(a); 
                                                                                                                            
            contentHolder.appendChild(title);
            contentHolder.appendChild(content); 
            contentHolder.appendChild(details);             
            
            blogCard.appendChild(contentHolder); 
            
            console.log(blogCard); 
            div.appendChild(blogCard); 
        }                    
    })
    .catch(function (error) {        
        console.log(error);
        div.innerHTML = "<div class='blog-card'><div class='content-holder'>Error Loading Blog x-x</div></div>"; 
    });
}

function myFunction() {
    console.log('Button Clicked'); 
    var data = '';

    var config = {
    method: 'get',
    url: 'https://sistech-api.vercel.app/blog/',
    headers: { 
        'Authorization': 'Bearer 8525d756-d533-4262-abde-722bba98c1b2'
    },
    data : data
    };

    axios(config)
    .then(function (response) {
        div = document.getElementById("testing"); 
        res = response.data; 
        console.log(res.length);
        for(let i = 0; i<res.length; i++) {
            const h4 = document.createElement('h4'); 
            h4.innerHTML = "halo"; 
            div.appendChild(h4); 
        }

        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);        
    });
}

function checkPin() {
    let person = prompt("Admin only, please enter pin ;)");
    let text;
    if (person == "4567") {
        window.location.href='editor/editor.html'; 
    } else {
        alert("Sorry, wrong pin :("); 
    }
}