import { belongsTo, createServer, Model } from 'miragejs'
if (process.env.NODE_ENV === 'development') {
  createServer({
    models: {
      user: Model,
      tweet: Model.extend({
        user: belongsTo()
      }),
      trend: Model,
      // favorite: Model.extend({
      //   user: belongsTo(),
      //   tweets: hasMany()
      // }),
      favorite: Model,
    },
    seeds(server){
      // USER AUTHENTICATION
      server.create("user", {
        profileImage: "https://media-exp1.licdn.com/dms/image/C4E03AQGZz-es94OFNA/profile-displayphoto-shrink_800_800/0/1634675760418?e=1640822400&v=beta&t=gaXqthRVOp2GVVBLcEqkpjuWqWgv_LfvazrAMqtsav0",
        coverImage: "https://media-exp1.licdn.com/dms/image/C4E16AQHWhyh6Wkxihg/profile-displaybackgroundimage-shrink_200_800/0/1635365016816?e=1640822400&v=beta&t=RJMA4iZIl21P1zZG7qB2ZGOXpb4ct8ff8OBK_rlbEZA",
        nickName: "@jack_primo",
        fullName: "Jackson Aquino",
        tweets: 0,
        following: 422,
        followers: 124 
      })
      // USERS
      server.create("user", {
        profileImage: "https://c2.staticflickr.com/4/3806/9555518281_841f11d6bb_b.jpg",
        nickName: "@jeffalmeida",
        fullName: "jefferson almeida",
        tweets: 210,
        following: 422,
        followers: 124
      })
      server.create("user", {
        profileImage: "https://www.thefamouspeople.com/profiles/images/chuck-norris-7.jpg",
        nickName: "@chuckNorris",
        fullName: "chuck norris",
        tweets: 210,
        following: 422,
        followers: 124
      })
      server.create("user", {
        profileImage: "https://famosos.culturamix.com/blog/wp-content/gallery/fotos-raras-de-bruce-lee-1/Fotos-Raras-de-Bruce-Lee-1.jpg",
        nickName: "@bruceLee",
        fullName: "Bruce Lee",
        tweets: 210,
        following: 422,
        followers: 124
      })
      server.create("user", {
        nickName: "@scottPilgrim",
        fullName: "Scott Pilgrim",
        tweets: 210,
        following: 422,
        followers: 124
      })
      // TWEETS
      server.create("tweet", {
        userId: 1,
        date: new Date(2016,8,4),
        description: 'Ola amigos como estão, tranquilos?'
      })
      server.create("tweet", {
        userId: 1,
        date: new Date(2018,7,7),
        description: 'Ola amigos como estão, tranquilos?'
      })
      server.create("tweet", {
        userId: 2,
        date: new Date(2020,1,1),
        description: 'Minha comida favorita!',
        image: "https://emagrecimentonasaude.com/wp-content/uploads/2014/12/salmao.jpg"
      })
      server.create("tweet", {
        userId: 3,
        date: new Date(2017,8,1),
        description: 'Que belo por do sol',
        image: "https://jornalsentinela.com.br/wp-content/uploads/2016/11/por-do-sol-2.jpg"
      })
      server.create("tweet", {
        userId: 4,
        date: new Date(2019,4,1),
        description: 'Curtindo uma praia',
        image: "https://www.oguiadeportugal.com/wp-content/uploads/2019/06/praia-luz-portugal.jpg"
      })
      server.create("tweet", {
        userId: 1,
        date: new Date(2018,2,1),
        description: 'Minha comida favorita!',
        image: "https://i.pinimg.com/originals/85/79/af/8579af203a6f327c7188c399c662c29d.png"
      })
      // TRENDS
      server.create("trend", { description: "covid-19" })
      server.create("trend", { description: "auxilio emergencial" })
      server.create("trend", { description: "eleições 2022" })
    },
    routes() {
      this.get("/auth/user-authenticated", (schema) => {
          return schema.users.first()
        }
      )
      this.get("/users/:searchName", (schema, request) => {
        const users = schema.users.all().models
        const searchName = request.params.searchName.toUpperCase()
        if(!searchName) return []
        else {
          return users.filter(user=>user.fullName.toUpperCase().match(searchName))
        }
      })
      this.get("/profile/:nickName", (schema, request) => {
          const nickName = request.params.nickName;
          const user = schema.users.findBy({ nickName })
          user.attrs.following = schema.users.all().models.filter(u=>u.id !== user.id)
          user.attrs.followers = schema.users.all().models.filter(u=>u.id !== user.id)
          return user
        }
      )
      this.get("/sugestion-to-follow", (schema) => {
          return schema.users.all().models
        }
      )
      this.get("/tweets", (schema, request) => {
          let tweets = schema.tweets.all()
          tweets = tweets.models.map(t => {
            return {...t.attrs, user: t.user.attrs}
          })
          const results = Number(request.queryParams.results)
          if(results) {
            return tweets.slice(results * 5 - 5, results * 5)
          } else {
            return tweets
          }
        }
      )
      this.post("/tweets/favorites", (schema, request)=>{
        const { userId, tweetId } = JSON.parse(request.requestBody)
        const favoriteAlreadyExist = schema.favorites.findBy({ userId, tweetId })
        if(!favoriteAlreadyExist){
          schema.create("favorite", { userId, tweetId })
        }
      })
      this.get("/tweets/favorites/:userId", (schema, request)=>{
        const { userId } = request.params
        const {models: favorites} = schema.favorites.where({ userId })
        const tweetIds = favorites.map(f=>f.tweetId)
        return schema.tweets.find(tweetIds).models.map(t=>{
          return {...t.attrs, user: t.user.attrs}
        })
      })
      this.get("/trends", (schema) => {
        const trends = schema.trends.all().models.map(t=>t.description)
        return trends
      })
    },
  })
}