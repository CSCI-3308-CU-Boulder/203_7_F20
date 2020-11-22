const query = require('../db')

let insertAchievement = (user, achievement) => new Promise((resolve, reject) => {
    query(`INSERT INTO achievements (user_id, name, description, image_id) VALUES (${user.id}, '${achievement.name}', '${achievement.description}', ${achievement.image_id});`)
    .then(response => {
        // Get latest achievement
        query(`SELECT * FROM achievements WHERE user_id = ${user.id} ORDER BY id DESC LIMIT 1;`)
        .then(results => resolve(results.rows[0]))
        .catch(err => reject(err))
    })
    .catch(err => reject(err))
})

module.exports = {
    calculateNewAchievements: (user) => new Promise((resolve, reject) => { // Only call this when a task is completed
        // Count completed tasks
        console.log("calculateNewAchievements")
        let { id } = user
        query(`SELECT impact_points FROM users WHERE id = ${id};`)
        .then(results => {
            console.log(results)
            let { impact_points } = results.rows[0]

            var newAchievement

            switch (impact_points) {
                case 5:
                    newAchievement = { name: "5 impact points accumulated!", description: "Congratulations on reaching your first achievment! Keep it up :)", image_id: 0 }
                    break
                case 10:
                    newAchievement = { name: "10 impact points accumulated!", description: "Nice job reaching another achievment!", image_id: 1 }
                    break
                case 15:
                    newAchievement = { name: "15 impact points accumulated!", description: "You're on a roll!", image_id: 2 }
                    break
                case 25:
                    newAchievement = { name: "Impact Seedling", description: "Wow 25 points! Incredible!", image_id: 3 }
                    break
                case 50:
                    newAchievement = { name: "Baby Sprout", description: "50 points: The earth will bless you because of your generous actions", image_id: 4 }
                    break
                case 100:
                    newAchievement = { name: "Mini Tree", description: "100 points: You're journey to becoming a large oxygen producing tree, full of life, has officially begun!", image_id: 5 }
                    break
                default:
                    break
            }

            if (!newAchievement && impact_points % 50 == 0 && impact_points != 0) {
                newAchievement = { name: `${impact_points} impact points accumulated`, description: "Keep it up. Thank you for your impacts, from the whole world.", image_id: 6 }
            } 

            console.log(newAchievement)

            if (newAchievement) {
                insertAchievement(user, newAchievement)
                .then(ach => resolve(ach))
                .catch(err => reject(err))
            } else {
                resolve(null)
            }

        })
        .catch(err => {
            reject({ err: err })
        })
    })
}
export {}
