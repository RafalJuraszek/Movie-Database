package com.rafaljuraszek.movie.graphservice.model;


import lombok.Builder;
import org.neo4j.ogm.annotation.EndNode;
import org.neo4j.ogm.annotation.RelationshipEntity;
import org.neo4j.ogm.annotation.StartNode;
import org.springframework.data.annotation.Id;

@RelationshipEntity("IS_FOLLOWING")
@Builder
public class Following {

    @Id
    private Long id;

    @StartNode
    private User startNode;

    @EndNode
    private User endNode;
}
