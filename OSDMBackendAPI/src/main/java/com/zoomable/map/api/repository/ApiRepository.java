package com.zoomable.map.api.repository;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

import com.zoomable.map.api.model.InventoryModel;

@Repository
@SuppressWarnings("rawtypes")
public class ApiRepository {

	@Autowired
	MongoTemplate mongoTemplate;
	
	public List<InventoryModel> filterByCriteria(Map criteria , boolean top10, int limit) {
				
		List<AggregationOperation> operations = new LinkedList<>();
		
		
		
		if(criteria.containsKey("byRegion")) {
			operations.add(match(Criteria.where("Region").is((String) criteria.get("region"))));
		}
		
		if(criteria.containsKey("byState")) {
			operations.add(match(Criteria.where("State").is((String) criteria.get("state"))));
		}
		
		if(criteria.containsKey("byPlantCode")) {
			operations.add(match(Criteria.where("PlantCode").is((String) criteria.get("plantCode"))));
		}
		
		if(criteria.containsKey("byMaterialNumber")) {
			operations.add(match(Criteria.where("MaterialNo").is((String) criteria.get("materialNumber"))));
		}
		
		/* operations.add(group("region").sum("inventoryValue").as("totalInventroyValueByRegion"));
		operations.add(project("totalInventroyValueByRegion").and("region").previousOperation()); */
		operations.add(sort(Sort.Direction.DESC, "value"));
		
		if(top10){
			operations.add(limit(limit));
		}
				
		Aggregation agg = newAggregation(operations);
		
		return getResult(agg);
		
	}
	
	private List<InventoryModel> getResult(Aggregation agg){
		
		AggregationResults<InventoryModel> groupResults = mongoTemplate.aggregate(agg, "Inventory", InventoryModel.class);
		List<InventoryModel> result = groupResults.getMappedResults();
		
		return result;
		
	}

}
