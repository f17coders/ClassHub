package com.f17coders.classhub.module.domain.personalChat.repository;

import com.f17coders.classhub.module.domain.personalChat.PersonalChat;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
@AllArgsConstructor
public class PersonalChatRepositoryImpl implements PersonalChatCustomRepository {

    private final MongoTemplate mongoTemplate;

    @Override
    public List<PersonalChat> findListBySenderOrReceiver(String memberId) {
        Criteria criteria = new Criteria().orOperator(
            Criteria.where("sender.memberId").is(memberId),
            Criteria.where("receiver.memberId").is(memberId)
        );
        Query query = new Query(criteria)
            .with(Sort.by(Direction.DESC, "createTime"));

        return mongoTemplate.find(query, PersonalChat.class);
    }

    @Override
    public PersonalChat findBySenderOrReceiver(String senderId, String receiverId) {
        Criteria criteria = new Criteria().orOperator(
            new Criteria().andOperator(
                Criteria.where("sender.memberId").is(senderId),
                Criteria.where("receiver.memberId").is(receiverId)
            ),
            new Criteria().andOperator(
                Criteria.where("sender.memberId").is(receiverId),
                Criteria.where("receiver.memberId").is(senderId)
            )
        );
        Query query = new Query(criteria);
        return mongoTemplate.findOne(query, PersonalChat.class);
    }
}
