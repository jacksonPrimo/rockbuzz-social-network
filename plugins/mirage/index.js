import { createServer, Model } from 'miragejs'
if (process.env.NODE_ENV === 'development') {
  createServer({
    models: {
      userAuthenticated: Model,
      user: Model,
      tweet: Model,
      trend: Model,
    },
    seeds(server){
      // USER AUTHENTICATION
      server.create("userAuthenticated", {
        profileImage: "https://media-exp1.licdn.com/dms/image/C4E03AQGZz-es94OFNA/profile-displayphoto-shrink_800_800/0/1634675760418?e=1640822400&v=beta&t=gaXqthRVOp2GVVBLcEqkpjuWqWgv_LfvazrAMqtsav0",
        coverImage: "https://media-exp1.licdn.com/dms/image/C4E16AQHWhyh6Wkxihg/profile-displaybackgroundimage-shrink_200_800/0/1635365016816?e=1640822400&v=beta&t=RJMA4iZIl21P1zZG7qB2ZGOXpb4ct8ff8OBK_rlbEZA",
        nickName: "Jackson Aquino",
        fullName: "@jack_primo",
        tweets: 210,
        following: 422,
        followers: 124 
      })
      // USERS
      server.create("user", {
        profileImage: "https://c2.staticflickr.com/4/3806/9555518281_841f11d6bb_b.jpg",
        nickName: "@jeffalmeida",
        fullName: "jefferson almeida"
      })
      server.create("user", {
        profileImage: "https://www.thefamouspeople.com/profiles/images/chuck-norris-7.jpg",
        nickName: "@chuckNorris",
        fullName: "chuck norris"
      })
      server.create("user", {
        profileImage: "https://famosos.culturamix.com/blog/wp-content/gallery/fotos-raras-de-bruce-lee-1/Fotos-Raras-de-Bruce-Lee-1.jpg",
        nickName: "@bruceLee",
        fullName: "Bruce Lee" 
      })
      server.create("user", {
        nickName: "@scottPilgrim",
        fullName: "Scott Pilgrim"
      })
      // TWEETS
      server.create("tweet", {
        userId: 1,
        description: 'Ola amigos como estão, tranquilos?'
      })
      server.create("tweet", {
        userId: 1,
        description: 'Ola amigos como estão, tranquilos?'
      })
      server.create("tweet", {
        userId: 1,
        description: 'Ola amigos como estão, tranquilos?'
      })
      server.create("tweet", {
        userId: 1,
        description: 'Ola amigos como estão, tranquilos?'
      })
      server.create("tweet", {
        userId: 2,
        description: 'Minha praia favorita!',
        image: "https://hddesktopwallpapers.in/wp-content/uploads/2015/09/switzerland-images.jpg"
      })
      server.create("tweet", {
        userId: 3,
        description: 'Minha comida favorita!',
        image: "https://hddesktopwallpapers.in/wp-content/uploads/2015/09/switzerland-images.jpg"
      })
      server.create("tweet", {
        userId: 4,
        description: 'Minha comida favorita!',
        image: "https://hddesktopwallpapers.in/wp-content/uploads/2015/09/switzerland-images.jpg"
      })
      server.create("tweet", {
        userId: 1,
        description: 'Minha comida favorita!',
        image: "https://hddesktopwallpapers.in/wp-content/uploads/2015/09/switzerland-images.jpg"
      })
      // TRENDS
      server.create("trend", { description: "covid-19" })
      server.create("trend", { description: "auxilio emergencial" })
      server.create("trend", { description: "eleições 2022" })
    },
    routes() {
      this.get("/auth/user-authenticated", (schema) => {
          return schema.userAuthenticateds.first()
        }
      )
      this.get("/sugestion-to-follow", (schema) => {
          return schema.users.all().models
        }
      )
      this.get("/tweets", (schema, request) => {
          let tweets = schema.tweets.all()
          tweets = tweets.models.map(t => {
            const user = schema.users.find(t.userId)
            return {...t.attrs, user}
          })
          const results = Number(request.queryParams.results)
          if(results) {
            return tweets.slice(results * 5 - 5, results * 5)
          } else {
            return tweets
          }
        }
      )
      this.get("/trends", (schema) => {
          const trends = schema.trends.all().models.map(t=>t.description)
          return trends
        }
      )
    },
  })
}