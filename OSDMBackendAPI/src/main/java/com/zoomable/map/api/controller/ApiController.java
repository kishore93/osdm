package com.zoomable.map.api.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

	/*@Qualifier("apiRepositoryImpl")
	@Autowired
	private ApiRepository repository;*/
	
	@GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE, params = {"region", "state", "plantCode",
			"materialNo", "excessQty30Days", "excessQty60Days", "excessQty90Days", "excessValue30Days", "excessValue60Days", "excessValue90Days",
			"obsoleteQty", "obsoleteValue" })
	public List<InventoryModel> getAllRecordsByFilters(
			@RequestParam(value = "region", required = false) String region,
			@RequestParam(value = "state", required = false) String state,
			@RequestParam(value = "plantCode", required = false) String plantCode,
			@RequestParam(value = "materialNo", required = false) String materialNo,
			@RequestParam(value = "excessQty30Days", required = false, defaultValue = "false") boolean excessQty30Days,
			@RequestParam(value = "excessQty60Days", required = false, defaultValue = "false") boolean excessQty60Days,
			@RequestParam(value = "excessQty90Days", required = false, defaultValue = "false") boolean excessQty90Days,
			@RequestParam(value = "excessValue30Days", required = false, defaultValue = "false") boolean excessValue30Days,
			@RequestParam(value = "excessValue60Days", required = false, defaultValue = "false") boolean excessValue60Days,
			@RequestParam(value = "excessValue90Days", required = false, defaultValue = "false") boolean excessValue90Days,
			@RequestParam(value = "obsoleteQty", required = false, defaultValue = "false") boolean obsoleteQty,
			@RequestParam(value = "obsoleteValue", required = false, defaultValue = "false") boolean obsoleteValue,
			HttpServletResponse response
			) {
		response.setStatus(HttpStatus.OK.value());
		return service.find(region, state, plantCode, materialNo, excessQty30Days, excessQty60Days, excessQty90Days, excessValue30Days,
				excessValue60Days, excessValue90Days, obsoleteQty, obsoleteValue);
	}
	
	@GetMapping(value = "/top/{limit}", produces = MediaType.APPLICATION_JSON_VALUE, params = {"region", "state", "plantCode",
			"materialNo", "excessQty30Days", "excessQty60Days", "excessQty90Days", "excessValue30Days", "excessValue60Days", "excessValue90Days",
			"obsoleteQty", "obsoleteValue" })
	public List<InventoryModel> getRecordsByLimitByFilters(
			@PathVariable(value = "limit", required = true) int limit,
			@RequestParam(value = "region", required = false) String region,
			@RequestParam(value = "state", required = false) String state,
			@RequestParam(value = "plantCode", required = false) String plantCode,
			@RequestParam(value = "materialNo", required = false) String materialNo,
			@RequestParam(value = "excessQty30Days", required = false, defaultValue = "false") boolean excessQty30Days,
			@RequestParam(value = "excessQty60Days", required = false, defaultValue = "false") boolean excessQty60Days,
			@RequestParam(value = "excessQty90Days", required = false, defaultValue = "false") boolean excessQty90Days,
			@RequestParam(value = "excessValue30Days", required = false, defaultValue = "false") boolean excessValue30Days,
			@RequestParam(value = "excessValue60Days", required = false, defaultValue = "false") boolean excessValue60Days,
			@RequestParam(value = "excessValue90Days", required = false, defaultValue = "false") boolean excessValue90Days,
			@RequestParam(value = "obsoleteQty", required = false, defaultValue = "false") boolean obsoleteQty,
			@RequestParam(value = "obsoleteValue", required = false, defaultValue = "false") boolean obsoleteValue,
			HttpServletResponse response
			) {
		response.setStatus(HttpStatus.OK.value());
		return service.findLimit(region, state, plantCode, materialNo, excessQty30Days, excessQty60Days, excessQty90Days, excessValue30Days,
				excessValue60Days, excessValue90Days, obsoleteQty, obsoleteValue, limit);
	}
	
	/*
	@GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE, params = { "excessQty30Days",
			"excessQty60Days", "excessQty90Days", "excessValue30Days", "excessValue60Days", "excessValue90Days",
			"obsoleteQty", "obsoleteValue" })
	public List<InventoryModel> getAllRecords(
			@RequestParam(value = "excessQty30Days", required = false, defaultValue = "false") boolean excessQty30Days,
			@RequestParam(value = "excessQty60Days", required = false, defaultValue = "false") boolean excessQty60Days,
			@RequestParam(value = "excessQty90Days", required = false, defaultValue = "false") boolean excessQty90Days,
			@RequestParam(value = "excessValue30Days", required = false, defaultValue = "false") boolean excessValue30Days,
			@RequestParam(value = "excessValue60Days", required = false, defaultValue = "false") boolean excessValue60Days,
			@RequestParam(value = "excessValue90Days", required = false, defaultValue = "false") boolean excessValue90Days,
			@RequestParam(value = "obsoleteQty", required = false, defaultValue = "false") boolean obsoleteQty,
			@RequestParam(value = "obsoleteValue", required = false, defaultValue = "false") boolean obsoleteValue
			) {
		return repository.findAll(excessQty30Days, excessQty60Days, excessQty90Days, excessValue30Days,
				excessValue60Days, excessValue90Days, obsoleteQty, obsoleteValue);
	}

	@GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE, params = { "region", "excessQty30Days",
			"excessQty60Days", "excessQty90Days", "excessValue30Days", "excessValue60Days", "excessValue90Days",
			"obsoleteQty", "obsoleteValue" })
	public List<InventoryModel> getAllRecordsByRegion(
			@RequestParam(value = "region", required = true) final String region,
			@RequestParam(value = "excessQty30Days", required = false, defaultValue = "false") boolean excessQty30Days,
			@RequestParam(value = "excessQty60Days", required = false, defaultValue = "false") boolean excessQty60Days,
			@RequestParam(value = "excessQty90Days", required = false, defaultValue = "false") boolean excessQty90Days,
			@RequestParam(value = "excessValue30Days", required = false, defaultValue = "false") boolean excessValue30Days,
			@RequestParam(value = "excessValue60Days", required = false, defaultValue = "false") boolean excessValue60Days,
			@RequestParam(value = "excessValue90Days", required = false, defaultValue = "false") boolean excessValue90Days,
			@RequestParam(value = "obsoleteQty", required = false, defaultValue = "false") boolean obsoleteQty,
			@RequestParam(value = "obsoleteValue", required = false, defaultValue = "false") boolean obsoleteValue
			) {
		return repository.findByRegion(region, excessQty30Days, excessQty60Days, excessQty90Days, excessValue30Days,
				excessValue60Days, excessValue90Days, obsoleteQty, obsoleteValue);
	}

	@GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE, params = { "state", "excessQty30Days",
			"excessQty60Days", "excessQty90Days", "excessValue30Days", "excessValue60Days", "excessValue90Days",
			"obsoleteQty", "obsoleteValue" })
	public List<InventoryModel> getAllRecordsByState(
			@RequestParam(value = "region", required = true) final String state
			) {
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
		return repository.findTopLimitByRegion(region,
				PageRequest.of(1, limit, new Sort(Sort.Direction.DESC, "value")));
	}

	@GetMapping(value = "/top/{limit}", params = { "state" }, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<InventoryModel> getRecordsByLimitForState(@PathVariable int limit, @RequestParam String state) {
		return repository.findTopLimitByState(state, PageRequest.of(1, limit, new Sort(Sort.Direction.DESC, "value")));
	}

	@GetMapping(value = "/top/{limit}", params = { "plantCode" }, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<InventoryModel> getRecordsByLimitForPlantCode(@PathVariable int limit, @RequestParam String plantCode) {
		return repository.findTopLimitByPlantCode(plantCode,
				PageRequest.of(1, limit, new Sort(Sort.Direction.DESC, "value")));
	}

	@GetMapping(value = "/top/{limit}", params = { "materialNo" }, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<InventoryModel> getRecordsByLimit(@PathVariable int limit, @RequestParam String materialNo) {
		return repository.findTopLimitByMaterialNo(materialNo,
				PageRequest.of(1, limit, new Sort(Sort.Direction.DESC, "value")));
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
	*/
	
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

	@GetMapping(value = "/material-numbers", params = { "region", "state",
			"plantCode" }, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<String> retrieveDistinctMaterialNumbers(@RequestParam(value = "region", required = false) String region,
			@RequestParam(value = "state", required = false) String state,
			@RequestParam(value = "plantCode", required = false) String plantCode) {
		return service.retrieveDistinctMaterialNumbers(region, state, plantCode);
	}

}
