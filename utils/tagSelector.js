const TAGS =  [
        "ASP.NET",
        "AWS",
        "Azure",
        "Cache",
        "Django",
        "Firebase",
        "GCP",
        "Hazelcast",
        "Hibernate",
        "Java",
        "JDK",
        "JPA",
        "JUnit",
        "Kafka",
        "Memcached",
        "Mybatis",
        "MySQL",
        "Nginx",
        "Node",
        "NoSQL",
        "Oracle",
        "RabbitMQ",
        "Reactor",
        "Redis",
        "REST",
        "Ruby on Rails",
        "Spring",
        "Spring Boot",
        "SQL",
        "Android",
        "Kotlin",
        "Swift",
        "Angular",
        "Chrome",
        "Firefox",
        "Flexbox",
        "HTML",
        "Javascript",
        "Jekyll",
        "PWA",
        "React.js",
        "Vue",
        "Webpack",
        "BERT",
        "Keras",
        "Python",
        "Spark",
        "TensorFlow",
        "Ansible",
        "BGP",
        "Cloud",
        "Docker",
        "Kubernetes",
        "Linux",
        "NETCONF",
        "Rust",
        "Ubuntu",
        "YANG",
        "zsh",
        "Assembly",
        "Code Review",
        "Blockchain",
        "Ethereum",
        "Git",
        "GoLang",
        "HTTPS",
        "HTTP/3",
        "Intellij",
        "Slack",
        "UML",
        "VR",
        "Windows"
    ]


exports.tagSelector = function (posts) {
//    let selected = posts
//                   .filter(post =>
//                       {
//                           if(post.categories === undefined) return true
//
//                           return post.categories.some(category => TAGS.some(tag => category.toLowerCase().includes(tag.toLowerCase())))
//                       }
//                   )

    // 매칭된 태그 추가
    return posts
           .reduce((accumulator, post) =>
           {
               if(post.categories === undefined) {
                    let newItem = {...post, targetTag: '😂'}
                    accumulator.push(newItem)
                    return accumulator
               }

               let matchedTag = TAGS.filter(tag => post.categories.some(category => category.toLowerCase().includes(tag.toLowerCase())))

               if(matchedTag.length > 0) {
                    let newItem = {...post, targetTag: matchedTag}
                    accumulator.push(newItem)
               }

               return accumulator
           }, [])
}