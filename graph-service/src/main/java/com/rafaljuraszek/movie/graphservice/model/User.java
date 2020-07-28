package com.rafaljuraszek.movie.graphservice.model;


import lombok.Builder;
import lombok.Data;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

import java.util.Set;

@Data
@Builder
@NodeEntity
public class User {

    @Id
    private Long id;
    private String userId;
    private String username;
    private String name;


    @Relationship(type="IS_FOLLOWING")
    private Set<Following> followings;
}
