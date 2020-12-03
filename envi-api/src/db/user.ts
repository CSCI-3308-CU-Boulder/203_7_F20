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
    calculateNewAchievements: (user, added) => new Promise((resolve, reject) => { // Only call this when a task is completed
        // Count completed tasks
        console.log("calculateNewAchievements")
        console.log("user points - " + added)
        let { id } = user
        query(`SELECT impact_points FROM users WHERE id = ${id};`)
        .then(results => {
            let { impact_points } = results.rows[0]

            var newAchievement

            switch (true) {
                case (impact_points >=5 && impact_points <= 7): // between 5 and 7
                    console.log("5-7 points!");
                    if((impact_points - added) < 5) {
                        newAchievement = { name: "5 impact points accumulated!", description: "Congratulations on reaching your first achievment! Keep it up :)", image_id: 0 }
                    }
                    break;
                case (impact_points >= 10 && impact_points <= 12): // between 10 and 12
                    console.log("10-12 points!");
                    if((impact_points - added) < 10) {
                        newAchievement = { name: "10 impact points accumulated!", description: "Nice job reaching another achievment!", image_id: 1 }
                    }
                    break;
                case (impact_points >= 15 && impact_points <= 17): // between 15 and 17 
                    console.log("15-17 points!");
                    if((impact_points - added) < 15) {
                        newAchievement = { name: "15 impact points accumulated!", description: "You're on a roll!", image_id: 2 }
                    }
                    break;
                case (impact_points >= 25 && impact_points <= 27): // between 25 and 27
                    console.log("25 to 27 points!");
                    if((impact_points - added) < 25) {
                        newAchievement = { name: "Impact Seedling", description: "Wow 25 points! Incredible!", image_id: 3 }
                    }
                    break;
                case (impact_points >= 50 && impact_points <= 52): // between 50 and 52
                    console.log("50 to 52 points!");
                    if((impact_points - added) < 50) {
                        newAchievement = { name: "Baby Sprout", description: "50 points: The earth will bless you because of your generous actions", image_id: 4 }
                    }
                    break;
                case (impact_points >= 100 && impact_points <= 102): // between 100 and 102
                    if((impact_points - added) < 100) {
                        newAchievement = { name: "Mini Tree", description: "100 points: You're journey to becoming a large oxygen producing tree, has officially begun!", image_id: 5 }
                    }
                    break;
                default:
                    break;
            }

            if (!newAchievement && (impact_points % 50 == 0 || impact_points % 51 == 0 || impact_points % 52 == 0) && impact_points != 0 && impact_points > 102) {
                newAchievement = { name: `${impact_points - (impact_points % 50)} impact points accumulated`, description: "Keep it up. Thank you for your impacts, from the whole world.", image_id: 6 }
            } 

            if (newAchievement) {
                // Check if achievement exists already
                query(`SELECT COUNT(*) FROM achievements WHERE user_id = ${user.id} AND name = '${newAchievement.name}';`)
                .then(results => {
                    if (results.rows[0].count == 0) {
                        // insert achievement
                        insertAchievement(user, newAchievement)
                        .then(ach => resolve(ach))
                        .catch(err => reject(err))
                    } else resolve(null)
                })
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


// Use reuasable water bottle
// reduce, use less water
// recycle can or bottle
// recycle batteries
// recycle electronics
// recycle plastic bags
// use reusable bags
// 