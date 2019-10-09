package com.zoomable.map.api.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.zoomable.map.api.model.InventoryModel;
import com.zoomable.map.api.repository.ApiRepository;
import com.zoomable.map.api.util.Util;

@Service
public class ApiService {

	@Autowired
	MongoTemplate template;
	
	@Autowired
	ApiRepository repository;
	
	public List<String> retrieveDistinctRegions() {
		Set<String> regions = new HashSet<>();
		repository.findAll(Sort.by(Sort.Direction.ASC, "Region"))
					.parallelStream()
					.forEach(model -> {
						regions.add(model.getRegion());
					});
		List<String> output = new ArrayList<>(regions);
		
		output.sort(new Comparator<String>() {
			@Override
			public int compare(String o1, String o2) {
				return o1.compareTo(o2);
			}
		});
		output.add(0, "ALL");
		return output;
	}
	
	public List<String> retrieveDistinctStates() {
		Set<String> states = new HashSet<>();
		repository.findAll(Sort.by(Sort.Direction.ASC, "State"))
					.parallelStream()
					.forEach(model -> {
						states.add(model.getState());
					});
		List<String> output = new ArrayList<>(states);
		
		output.sort(new Comparator<String>() {
			@Override
			public int compare(String o1, String o2) {
				return o1.compareTo(o2);
			}
		});
		output.add(0, "ALL");
		return output;
	}
	
	public List<String> retrieveDistinctPlantCodes() {
		Set<String> plantCodes = new HashSet<>();
		repository.findAll(Sort.by(Sort.Direction.ASC, "PlantCode"))
					.parallelStream()
					.forEach(model -> {
						plantCodes.add(model.getPlantCode());
					});
		List<String> output = new ArrayList<>(plantCodes);
		
		output.sort(new Comparator<String>() {
			@Override
			public int compare(String o1, String o2) {
				return o1.compareTo(o2);
			}
		});
		output.add(0, "ALL");
		return output;
	}
	
	public List<String> retrieveDistinctMaterialNumbers(String region, String state, String plantCode) {
		
		Set<String> materialNos = new HashSet<>();
		
		Query query = new Query();
		
		if(Util.isNullOrEmptyorAll(region)) {
			query.addCriteria(Criteria.where("Region").is(region));
		}
		
		if(Util.isNullOrEmptyorAll(state)) {
			query.addCriteria(Criteria.where("State").is(state));
		}
		
		if(Util.isNullOrEmptyorAll(plantCode)) {
			query.addCriteria(Criteria.where("PlantCode").is(plantCode));
		}
				
		template.find(query, InventoryModel.class)
					.parallelStream()
					.forEach(model -> {
						materialNos.add(model.getMaterialNo());
					});
				
		List<String> output = new ArrayList<>(materialNos);
		
		output.sort(new Comparator<String>() {
			@Override
			public int compare(String o1, String o2) {
				return o1.compareTo(o2);
			}
		});
		
		return output;
	}
}
