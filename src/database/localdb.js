import * as SQLite from 'expo-sqlite';

function open() {
    return SQLite.openDatabase('mood-tracker.db');
}

export function init() {
    return new Promise((resolve, reject) => {
        const database = open();

    database.transaction(
        (tx) => { 
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS Activities (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    activity TEXT NOT NULL
                    )
                    `,
                [],
                (tx, result) => {
                    //console.log('Activities table created',result);
                    resolve(true);
                },
                // (tx, result) => {
                //     console.log('SQL Success:', result);
                // },

                (tx, error) => {
                    console.log('SQL Error:', error.message);
                    reject(error);
                }
            );
            // console.log('Transaction:',tx);
        },

        (error) => {
            console.log('Tx Error:',error.message);
        },
        () => { 
            console.log('Tx Success');
        }
    );
});
}

export function destroy(){
    return new Promise((resolve, reject) => {
        const database = SQLite.open();
        database.transaction(
            (tx) => {
                tx.executeSql(
                'DROP TABLE IF EXISTS Activities',
                [],
                (tx,result) => {
                    resolve(true);
                },
                (tx, error) => {
                    reject(error);
                }
            );
           },
           (error) => {
                reject(error);
           }
        );
    });
}

export function read() {
    return new Promise((resolve, reject) => {
        const database = open();
        database.transaction(
            (tx) => {
                tx.executeSql(
                    'SELECT * FROM Activities',
                    [],
                    (tx, result) => {
                        const activities = [];
                        //console.log('Read:', result);
                        result.rows._array.forEach(row => {
                            const activity = {
                                id: row.id,
                                activity : row.activity
                            }
                            activities.push(activity);
                            //console.log('Activity:',activity);
                        });

                        resolve(activities);
                    },
                    (tx, error) => {
                        reject(error);
                    }
                );
            },
            (error) => {
                reject(error);
            }
        );
    });
}

export function add(activity) {
    return new Promise((resolve, reject) => {
        const database = open();
        console.log('Database opened', database);
        database.transaction(
            (tx) => {
                console.log('Database opened and now in transaction', database);
                tx.executeSql(
                    `
                    INSERT INTO Activities (activity)
                    VALUES (?)
                    `,
                    [activity],
                    (tx, result) => {
                        console.log('Data Added', result);
                        const newActivityEntry = {
                            activity: activity
                        };
                        resolve(newActivityEntry);
                    },
                    (tx, error) => {
                        console.log('Failed to add data', error.message);
                        reject(error);
                    }
                );
            },
            (error) => {
                console.log('Failed to add data', error.message);
                reject(error);
            }
        );
    });
}

export function update(id, activity) {
    return new Promise((resolve, reject) => {
        const database = open();
        database.transaction(
            (tx) => {
                tx.executeSql(
                    `
                    UPDATE Activities
                    SET activity = ?
                    WHERE id = ?;
                    `,
                    [activity,id],
                    (tx, result) => {
                        resolve();
                    },
                    (tx, error) => {
                        reject(error);
                    }
                );
            },
            (error) => {
                reject(error);
            }
        );
    });
}

export function remove(id) {
    return new Promise((resolve, reject) => {
        const database = open();
        database.transaction(
            (tx) => {
                tx.executeSql(
                    `
                    DELETE FROM Activities
                    WHERE id = ?
                    `,
                    [id],
                    (tx, result) => {
                        console.log('Delete', result);
                        resolve();
                    },
                    (tx, error) => {
                        reject(error);
                    }
                );
            },
            (error) => {
                reject(error);
            }
        );
    })
}

export function removeAll() {
    return new Promise((resolve, reject) => {
        const database = open();
        database.transaction(
            (tx) => {
                tx.executeSql(
                    `
                    DELETE FROM Activities
                    `,
                    [],
                    (tx, result) => {
                        console.log('Delete', result);
                        resolve();
                    },
                    (tx, error) => {
                        reject(error);
                    }
                );
            },
            (error) => {
                reject(error);
            }
        );
    })
}