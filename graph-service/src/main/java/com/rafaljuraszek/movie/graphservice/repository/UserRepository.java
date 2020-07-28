package com.rafaljuraszek.movie.graphservice.repository;


import com.rafaljuraszek.movie.graphservice.model.User;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends Neo4jRepository<User, Long> {

    Optional<User> findByUserId(String userId);

    Optional<User> findByUsername(String username);

    @Query("MATCH (n)-[r]->() where n.username=$username RETURN COUNT(r)")
    Long findOutDegree(String username);

    @Query("MATCH (n)<-[r]-() where n.username=$username RETURN COUNT(r)")
    Long findInDegree(String username);

    @Query("MATCH (n1:User{ username:$userA}), (n2:User{username: $userB}) RETURN EXISTS((n1) -[:IS_FOLLOWING]->(n2))")
    boolean isFollowing(String userA, String userB);

    @Query("MATCH (n:User{username:$username})<--(f:User) Return f")
    List<User> findFollowers(String username);

    @Query("MATCH (n:User{username:$username})-->(f:User) Return f")
    List<User> findFollowing(String username);


}
