| HTTP Verb  | Route                                  |  Description                    |  API  | 
|------------|----------------------------------------|---------------------------------|-------|
| GET        |  /                                     | Index page                      |       |   
| GET        |  /museums                              | List of museums                 |       |
| GET        |  /museums/details/:museum_id           | Museum details                  |   X   | 
| GET        |  /museums/filter/:museum_id            | Filter form for pieces          |   X   | 
| GET        |  /museums/create                       | New museum form                 |       |
| POST       |  /museums/create                       | Create new museum               |       |
| GET        |  /museums/edit/:museum_id              | Edit museum form                |       |
| POST       |  /museums/edit/:museum_id              | Update museum                   |       |
| POST       |  /museums/delete/:museum_id            | Delete museum                   |       |  
| GET        | /museums/:museum_id/piece/:piece_id    | Piece details                   |   X   |
| GET        | /museums/:museum_id/artist/:artist_id  | Pie                             |   X   |
| GET        |  /events                               | List of events                  |       |
| GET        |  /events/details/:event_id             | Event details                   |       |
| GET        |  /events/create                        | New event form                  |   X   |
| POST       |  /events/create                        | Create new event                |       |
| GET        |  /events/edit/:event_id                | Edit event form                 |   X   |
| POST       |  /events/edit/:event_id                | Update event                    |       |
| POST       |  /events/delete/:event_id              | Delete event                    |       |
| GET        |  /signup                               | Register form                   |       |
| POST       |  /signup                               | Register form handler           |       |
| GET        |  /login                                | Log in form                     |       |
| POST       |  /login                                | Log in form handler             |       |
| POST       |  /logout                               | Log out  handler                |       |
| GET        |  /users                                | List of users                   |       |
| GET        |  /users/details/:user_id               | User details                    |       |
| GET        |  /users/edit/:user_id                  | Edit user form                  |       |
| POST       |  /users/edit/:user_id                  | Update user                     |       |
| POST       |  /users/delete/:user_id                | Delete user                     |       |







# Museums
