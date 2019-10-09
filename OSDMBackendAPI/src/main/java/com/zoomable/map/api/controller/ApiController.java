package com.zoomable.map.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zoomable.map.api.model.InventoryModel;
import com.zoomable.map.api.repository.ApiRepository;
import com.zoomable.map.api.service.ApiService;

@RestController
@RequestMapping(value = "/api/v1")
public class ApiController {

	@Autowired
	private ApiService service;

	@Autowired
	private ApiRepository repository;

	@GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<InventoryModel> getAllRecords() {
		return repository.findAll();
	}

	@GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE, params = "region")
	public List<InventoryModel> getAllRecordsByRegion(@RequestParam final String region) {
		return repository.findByRegion(region);
	}
	
	@GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE, params = "state")
	public List<InventoryModel> getAllRecordsByState(@RequestParam final String state) {
		return repository.findByState(state);
	}
	
	@GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE, params = "plantCode")
	public List<InventoryModel> getAllRecordsByPlantCode(@RequestParam final String plantCode) {
		return repository.findByPlantCode(plantCode);
	}
	
	@GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE, params = "materialNo")
	public List<InventoryModel> getAllRecordsByMaterialNo(@RequestParam final String materialNo) {
		return repository.findByMaterialNo(materialNo);
	}

	@GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE, params = { "region", "state" })
	public List<InventoryModel> getAllRecordsByRegionAndState(@RequestParam final String region,
			@RequestParam final String state) {
		return repository.findByRegionAndState(region, state);
	}

	@GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE, params = { "region", "state",
			"plantCode" })
	public List<InventoryModel> getAllRecordsByRegionAndStateAndPlantCode(@RequestParam final String region,
			@RequestParam final String state, @RequestParam final String plantCode) {
		return repository.findByRegionAndStateAndPlantCode(region, state, plantCode);
	}

	@GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE, params = { "region", "state", "plantCode",
			"materialNo" })
	public List<InventoryModel> getAllRecordsByRegionAndStateAndPlantCode(@RequestParam final String region,
			@RequestParam final String state, @RequestParam final String plantCode,
			@RequestParam final String materialNo) {
		return repository.findByRegionAndStateAndPlantCodeAndMaterialNo(region, state, plantCode, materialNo);
	}

	@GetMapping(value = "/top/{limit}", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<InventoryModel> getRecordsByLimit(@PathVariable int limit) {
		return repository.findAll(PageRequest.of(1, limit, new Sort(Sort.Direction.DESC, "value"))).getContent();
	}

	@GetMapping(value = "/top/{limit}", params = { "region" }, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<InventoryModel> getRecordsByLimitForRegion(@PathVariable int limit, @RequestParam String region) {
		return repository.findTopLimitByRegion(region, PageRequest.of(1, limit, new Sort(Sort.Direction.DESC, "value")));
	}
	
	@GetMapping(value = "/top/{limit}", params = { "state" }, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<InventoryModel> getRecordsByLimitForState(@PathVariable int limit, @RequestParam String state) {
		return repository.findTopLimitByState(state, PageRequest.of(1, limit, new Sort(Sort.Direction.DESC, "value")));
	}
	
	@GetMapping(value = "/top/{limit}", params = { "plantCode" }, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<InventoryModel> getRecordsByLimitForPlantCode(@PathVariable int limit, @RequestParam String plantCode) {
		return repository.findTopLimitByPlantCode(plantCode, PageRequest.of(1, limit, new Sort(Sort.Direction.DESC, "value")));
	}
	
	@GetMapping(value = "/top/{limit}", params = { "materialNo" }, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<InventoryModel> getRecordsByLimit(@PathVariable int limit, @RequestParam String materialNo) {
		return repository.findTopLimitByMaterialNo(materialNo, PageRequest.of(1, limit, new Sort(Sort.Direction.DESC, "value")));
	}

	@GetMapping(value = "/top/{limit}", params = { "region", "state" }, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<InventoryModel> getRecordsByLimit(@PathVariable int limit, @RequestParam String region,
			@RequestParam String state) {
		return repository.findTopLimitByRegionAndState(region, state,
				PageRequest.of(1, limit, new Sort(Sort.Direction.DESC, "value")));
	}

	@GetMapping(value = "/top/{limit}", params = { "region", "state",
			"plantCode" }, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<InventoryModel> getRecordsByLimit(@PathVariable int limit, @RequestParam String region,
			@RequestParam String state, @RequestParam String plantCode) {
		return repository.findTopLimitByRegionAndStateAndPlantCode(region, state, plantCode,
				PageRequest.of(1, limit, new Sort(Sort.Direction.DESC, "value")));
	}

	@GetMapping(value = "/top/{limit}", params = { "region", "state", "plantCode",
			"materialNo" }, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<InventoryModel> getRecordsByLimit(@PathVariable int limit, @RequestParam String region,
			@RequestParam String state, @RequestParam String plantCode, @RequestParam String materialNo) {
		return repository.findTopLimitByRegionAndStateAndPlantCodeAndMaterialNo(region, state, plantCode, materialNo,
				PageRequest.of(1, limit, new Sort(Sort.Direction.DESC, "value")));
	}

	@GetMapping(value = "/regions", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<String> retrieveDistinctRegions() {
		return service.retrieveDistinctRegions();
	}
	
	@GetMapping(value = "/states", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<String> retrieveDistinctStates() {
		return service.retrieveDistinctStates();
	}
	
	@GetMapping(value = "/plant-codes", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<String> retrieveDistinctPlantCodes() {
		return service.retrieveDistinctPlantCodes();
	}
	
	@GetMapping(value = "/material-numbers", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<String> retrieveDistinctMaterialNumbers() {
		return service.retrieveDistinctMaterialNumbers();
	}
	
	

}
