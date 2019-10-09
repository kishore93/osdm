package com.zoomable.map.api.repository;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.zoomable.map.api.model.InventoryModel;

@Repository
public interface ApiRepository extends MongoRepository<InventoryModel, ObjectId> {

	public List<InventoryModel> findByRegion(String region);
	
	public List<InventoryModel> findByState(String state);
	
	public List<InventoryModel> findByPlantCode(String plantCode);
	
	public List<InventoryModel> findByMaterialNo(String materialNo);

	public List<InventoryModel> findByRegionAndState(String region, String state);

	public List<InventoryModel> findByRegionAndStateAndPlantCode(String region, String state, String plantCode);

	public List<InventoryModel> findByRegionAndStateAndPlantCodeAndMaterialNo(String region, String state,
			String plantCode, String materialNumber);

	@Query(value = "{'Region' : ?0}", sort = "{'value':1}")
	public List<InventoryModel> findTopLimitByRegion(String region, PageRequest pageRequest);
	
	@Query(value = "{'State' : ?0}", sort = "{'value':1}")
	public List<InventoryModel> findTopLimitByState(String state, PageRequest pageRequest);
	
	@Query(value = "{'PlantCode' : ?0}", sort = "{'value':1}")
	public List<InventoryModel> findTopLimitByPlantCode(String plantCode, PageRequest pageRequest);
	
	@Query(value = "{'MaterialNo' : ?0}", sort = "{'value':1}")
	public List<InventoryModel> findTopLimitByMaterialNo(String materialNo, PageRequest pageRequest);

	@Query(value = "{ 'Region' : ?0 , 'State' : ?1 }", sort = "{ 'value':1 }")
	public List<InventoryModel> findTopLimitByRegionAndState(String region, String state, PageRequest pageRequest);

	@Query(value = "{ 'Region' : ?0 , 'State' : ?1 , 'PlantCode' : ?2 }", sort = "{ 'value':1 }")
	public List<InventoryModel> findTopLimitByRegionAndStateAndPlantCode(String region, String state, String plantCode,
			PageRequest pageRequest);

	@Query(value = "{ 'Region' : ?0 , 'State' : ?1 , 'PlantCode' : ?2 , 'MaterialNo' : ?3}", sort = "{ 'value':1 }")
	public List<InventoryModel> findTopLimitByRegionAndStateAndPlantCodeAndMaterialNo(String region, String state,
			String plantCode, String materialNumber, PageRequest pageRequest);

}
