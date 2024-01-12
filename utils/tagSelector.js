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
        "React",
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
        "Windows",
        "XCode",
        "WWDC",
        "tuist",
        "ELK",
        "ECK",
        "Elasticsearch",
        "Architecture",
        "Front",
        "Back",
        "MSA",
        "K8S",
        "DBA",
        "Transaction",
        "테스트",
        "소나큐브",
        "sonarqube",
        "Refactoring",
        "리팩토링",
        "리펙토링",
        "클린 코드",
        "데이터베이스",
        "우아한",
        "컨퍼런스",
        "Memory",
        "PM",
        "QA",
        "Tech",
        "traffic",
        "coding test",
        "VirtualThread",
        "인공지능",
        "AI",
        "머신러닝",
        "IOS",
        "CQRS",
        "디자인 패턴",
        "쿠버네티스",
        "대용량",
        "DevOps",
        "마이크로서비스",
        "서킷브레이커"

    ]


exports.tagSelector = function (posts) {

    // 매칭된 태그 추가
    return posts
           .reduce((accumulator, post) =>
           {
                let isCategories = post.categories === undefined

               let matchedTag = TAGS.filter(tag => {
                  if(isCategories) {
                       return post.title.toLowerCase().includes(tag.toLowerCase())
                  }else{
                       return post.title.toLowerCase().includes(tag.toLowerCase()) || post.categories.some(category => category.toLowerCase().includes(tag.toLowerCase()))
                  }
               })

               if(matchedTag.length > 0) {
                   let newItem = {...post, targetTag: matchedTag}
                   accumulator.push(newItem)
               }

               return accumulator
           }, [])
}