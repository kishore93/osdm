package com.zoomable.map.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zoomable.map.api.model.InventoryModel;
import com.zoomable.map.api.service.ApiService;

@RestController
@RequestMapping(value = "/api/v1")
public class ApiController {

	@Autowired
	private ApiService service;
	
	@GetMapping(value = "/top/{limit}" , produces = MediaType.APPLICATION_JSON_VALUE)
	public List<InventoryModel> sortTopTenRecordsByCriteria(
				@PathVariable(name = "limit", required = true) final int limit,
				@RequestParam(name = "region", required = false) final String region,
				@RequestParam(name = "state", required = false) final String state,
				@RequestParam(name = "plantCode", required = false) final String plantCode,
				@RequestParam(name = "materialNumber", required = false) final String materialNumber
			)
	{
		return service.fetchRecordsByCriteria(region, state, plantCode, materialNumber, true, limit);
	}
	
	@GetMapping(value = "/all" , produces = MediaType.APPLICATION_JSON_VALUE)
	public List<InventoryModel> sortRecordsByCriteria(
				@RequestParam(name = "region", required = false) final String region,
				@RequestParam(name = "state", required = false) final String state,
				@RequestParam(name = "plantCode", required = false) final String plantCode,
				@RequestParam(name = "materialNumber", required = false) final String materialNumber
			)
	{
		return service.fetchRecordsByCriteria(region, state, plantCode, materialNumber, false, -1);
	}
	
}
