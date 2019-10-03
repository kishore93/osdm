package com.zoomable.map.api.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zoomable.map.api.model.InventoryModel;
import com.zoomable.map.api.repository.ApiRepository;
import com.zoomable.map.api.util.Util;

@Service
public class ApiService {

	@Autowired
	ApiRepository repository;

	public List<InventoryModel> fetchRecordsByCriteria(String region, String state, String plantCode, String materialNumber, boolean top10, int limit) {
		
		Map<String, Object> criteria = new HashMap<>();
		
		if(! Util.isNullOrEmpty(region)) {
			criteria.put("byRegion", true);
			criteria.put("region", region);
		}
		
		if(! Util.isNullOrEmpty(state)) {
			criteria.put("byState", true);
			criteria.put("state", state);
		}
		
		if(! Util.isNullOrEmpty(plantCode)) {
			criteria.put("byPlantCode", true);
			criteria.put("plantCode", plantCode);
		}
		
		if(! Util.isNullOrEmpty(materialNumber)) {
			criteria.put("byMaterialNumber", true);
			criteria.put("materialNumber", materialNumber);
		}
		
		return repository.filterByCriteria(criteria, top10, limit);
		
	}
	
}
