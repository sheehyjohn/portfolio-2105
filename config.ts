const siteMetadata = {
    title: `John Sheehy`,
    siteUrl: `http://localhost`,
    capitalizeTitleOnHome: false,
    logo: `/images/logo1.png`,
    icon: `/images/icon1.png`, 
    titleImage: `/images/daisy-square.jpg`,
    ogImage: `/images/daisy-square.jpg`,
    twoColumnWall: true,
    cookiePolicy: true,
    introTag: `photography`,
    //description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet accumsan arcu. Proin ac consequat arcu.`,
    description: ` `,
    about:
        "Cras accumsan a lectus at tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus elementum dapibus dictum. Mauris auctor quam nec est tincidunt hendrerit. Donec pulvinar lobortis mauris. Cras vulputate ullamcorper ligula a rhoncus. Nunc venenatis elementum ligula in semper. Mauris malesuada purus nunc, et ultricies leo aliquam ac. Ut sit amet nunc id magna accumsan hendrerit in eget metus.",
    author: `@_akzhy`,
    blogItemsPerPage: 10,
    portfolioItemsPerPage: 10,
    darkmode: true,
    switchTheme: true,
    navLinks: [
        {
            name: "HOME",
            url: "/",
        },
      /*
        {
            name: "ABOUT",
            url: "/about",
        },
        {
            name: "BLOG",
            url: "/blog",
        },
        */
        {
            name: "PORTFOLIO",
            url: "/portfolio",
        }//,
        /*
        {
            name: "CONTACT",
            url: "/contact",
        },
        */
    ],
    footerLinks: [
        /*
        {
            name: "PRIVACY POLICY",
            url: "/privacy-policy",
        },
        */
        {
            name: "GitHub",
            url: "https://github.com/sheehyjohn",
        }//,
        
    ],
    social: [
        /*
        {
            name: "Facebook",
            icon: "/images/Facebook.svg",
            url: "#",
        },
        */
        {
            name: "Email",
            icon: "/images/email.png",
            url: "mailto:sheehy.john@gmail.com",
        },
        {
            name: "Twitter",
            icon: "/images/Twitter.svg",
            url: "https://twitter.com/sheehyjohn",
        },
        {
            name: "Instagram",
            icon: "/images/Instagram.svg",
            url: "https://www.instagram.com/sheehy.john",
        },
        {
            name: "Youtube",
            icon: "/images/Youtube.svg",
            url: "https://www.youtube.com/user/sheehyjohn",
        },
    ],
    contact: {
        // leave empty ('') or false to hide form
        api_url: " ",
        description: '',
        mail: '',
        phone: '',
        address: '',
    },
    disqus: "elemental-netlify-com", 
}

const beforeContactFormSubmit = data => {
    // Code 0 - success
    // Code 1 - Name
    // Code 2 - Email
    // Code 3 - Message
    // Code 4 - Other
    const errors = []

    if (data.name.trim().length < 2) {
        errors.push({
            code: 1,
            message: "Enter a name",
        })
    }

    if (!data.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
        errors.push({
            code: 2,
            message: "Enter a valid email address",
        })
    }

    if (data.message.trim().length < 15) {
        errors.push({
            code: 3,
            message: "Enter a message with atleast 15 characters",
        })
    }

    if (errors.length > 0)
        return {
            result: false,
            errors: errors,
        }

    return {
        data: {
            name: data.name,
            email: data.email,
            message: data.message,
        },
        result: true,
    }
}

const contactFormSubmit = async (api, data) => {
    let res: any = await fetch(api, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })

    res = await res.json()

    if (res.success) {
        return {
            result: true,
        }
    }
    return {
        result: false,
        ...res,
    }
}

const defaults = {
    disqus: null,
    twoColumnWall: true,
    darkmode: false,
    switchTheme: true,
    capitalizeTitleOnHome: true,
    cookiePolicy: false
}

Object.keys(defaults).forEach(item => {
    if (siteMetadata[item] === undefined) {
        siteMetadata[item] = defaults[item]
    }
})

export { siteMetadata, beforeContactFormSubmit, contactFormSubmit }
