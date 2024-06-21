function toggleForm() 
{
    var loginFormSection = document.getElementById('loginFormSection');
    var registerFormSection = document.getElementById('registerFormSection');

    if (loginFormSection.style.display === 'block' || loginFormSection.style.display === '') 
    {
        loginFormSection.style.display = 'none';
        registerFormSection.style.display = 'block';
    } 
    else 
    {
        loginFormSection.style.display = 'block';
        registerFormSection.style.display = 'none';
    }
}

function fetchNews() 
{
    fetch('https://newsapi.org/v2/top-headlines?country=ua&apiKey=bbf0c257e3a64bed80f7c9500d23f0ad')
        .then(response => response.json())
        .then(data => 
        {
            let newsSection = document.getElementById('news');
            newsSection.innerHTML = '';
            data.articles.forEach(article => 
            {
                let articleElem = document.createElement('article');
                articleElem.innerHTML = `
                    <img src="${article.urlToImage}" alt="${article.title}" style="width:300px;">
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                    <p>${article.publishedAt}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                `;
                newsSection.appendChild(articleElem);
            });
        })
        .catch(error => console.error('Error fetching news:', error));
}

function fetchWeather() 
{
    fetch('https://api.weatherapi.com/v1/forecast.json?key=2e2d08ead7e04285bbc111100242106&q=Rivne&days=3')
        .then(response => response.json())
        .then(data => 
        {
            let weatherSection = document.getElementById('weather');
            weatherSection.innerHTML = '';
            data.forecast.forecastday.forEach(day => 
            {
                let weatherElem = document.createElement('div');
                weatherElem.innerHTML = `
                    <h3>${day.date}</h3>
                    <p>Temperature: ${day.day.avgtemp_c}°C</p>
                    <p>Pressure: ${day.day.avgvis_miles} mb</p>
                    <p>Wind: ${day.day.maxwind_kph} km/h</p>
                    <p>Precipitation: ${day.day.totalprecip_mm} mm</p>
                    <img src="${day.day.condition.icon}" alt="${day.day.condition.text}">
                `;
                weatherSection.appendChild(weatherElem);
            });
        })
        .catch(error => console.error('Error fetching weather:', error));
}

function fetchImages(page = 1) 
{
    const perPage = 10;
    const apiKey = 'FiGkJxUAZydIzK1Bq88taB4H8OsX0RNs1d181LHLVfE73QyM9oLfuqbh';
    const apiUrl = `https://api.pexels.com/v1/curated?page=${page}&per_page=${perPage}`;

    fetch(apiUrl, 
    {
        headers: {
            Authorization: apiKey
        }
    })
        .then(response => response.json())
        .then(data => 
        {
            let gallerySection = document.getElementById('gallery');
            gallerySection.innerHTML = '';
            data.photos.forEach(photo => 
            {
                let imageElem = document.createElement('div');
                imageElem.innerHTML = `
                    <img src="${photo.src.large}" alt="${photo.photographer}">
                `;
                gallerySection.appendChild(imageElem);
            });

            let pagination = document.createElement('div');
            if (page > 1) 
            {
                pagination.innerHTML += `<button onclick="fetchImages(${page - 1})">Previous</button>`;
            }
            pagination.innerHTML += `<button onclick="fetchImages(${page + 1})">Next</button>`;
            gallerySection.appendChild(pagination);
        })
        .catch(error => console.error('Error fetching images:', error));
}

function validateLoginForm() 
{
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var rememberMe = document.getElementById('rememberMe').checked;

    if (username === '' || password === '') 
    {
        alert('Please fill all fields');
        return false;
    }
    if (rememberMe) 
        {
        setCookie('username', username, 7);
        setCookie('password', password, 7);
    }

    alert('Login form is valid');
    return true;
}

function validateRegisterForm() 
{
    var username = document.getElementById('newUsername').value;
    var password = document.getElementById('newPassword').value;
    var email = document.getElementById('newEmail').value;

    if (username === '' || password === '' || email === '') 
    {
        alert('Please fill in all fields.');
        return false;
    }

    if (!validateEmail(email)) 
    {
        alert('Please enter a valid email address.');
        return false;
    }

    alert('Register form is valid!');
    return true;
}

function validateEmail(email) 
{
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function setCookie(cname, cvalue, exdays) 
{
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) 
{
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) 
    {
        let c = ca[i];
        while (c.charAt(0) == ' ') 
        {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) 
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookies() 
{
    let username = getCookie('username');
    let password = getCookie('password');
    if (username != "" && password != "") 
    {
        document.getElementById('username').value = username;
        document.getElementById('password').value = password;
        document.getElementById('rememberMe').checked = true;
    }
}


document.addEventListener('DOMContentLoaded', function() 
{
    fetchNews();
    fetchWeather();
    fetchImages();
    checkCookies();
});
