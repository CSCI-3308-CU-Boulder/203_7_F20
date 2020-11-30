google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    loggedIn()
        .then(user => {
            console.log(user)
            if (user) {
                let id = user.id;
                let username = user.username;
                axios.get(`/api/users/${id}/numTasks`)
                    .then(function (response) {
                        console.log(response)
                        // let reduce = response.data.reduce[0].sum
                        // let reuse = response.data.reuse[0].sum
                        // let recycle = response.data.recycle[0].sum
                        let reduce = 8;
                        let reuse = 6;
                        let recycle = 12;
                        console.log(reduce)
                        if (reduce && reuse && recycle) {
                            document.getElementById("piechart").innerHTML = ""
                            var data = google.visualization.arrayToDataTable([
                                ['Type', 'Times Completed'],
                                ['Reduce', reduce],
                                ['Reuse', reuse],
                                ['Recycle', recycle]
                            ]);

                            var options = {
                                colors: ['#ecb349', '#7ca6a6', '#d86b54'],
                                legend: {
                                    position: 'none'
                                },
                                pieSliceText: 'label',
                                fontSize: '8px',
                                chartArea: {
                                    left: '10%',
                                    top: '10%',
                                    width: '100%',
                                }
                            };

                            var chart = new google.visualization.PieChart(document.getElementById('piechart'));

                            chart.draw(data, options);
                        }
                        else {

                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    })

            }
            else {
                alert("you are not logged in !")
            }

        })
        .catch(error => {
            console.log(error)
        })

}