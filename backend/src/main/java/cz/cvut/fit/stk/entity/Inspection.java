package cz.cvut.fit.stk.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;
import java.util.Objects;

/**
 * This class represents single inspection
 *
 * @author Aleksandra Parkhomenko
 *
 */

@Entity
@Table(name = "kontroly")
//@Table(name = "kontroly_all")
public class Inspection {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "stk_id")
    private Long stationId;

    @Column(name = "drtp")
    private String inspectionType;

    @Column(name = "vin")
    private String VIN;

    @Column(name = "datkont")
    private Date inspectionDate;

    @Column(name = "typmot")
    private String engineType;

    @Column(name = "tzn")
    private String vehicleBrand;

    @Column(name = "drvoz")
    private String vehicleType;

    @Column(name = "obchozntyp")
    private String vehicleModel;

    @Column(name = "ct")
    private String vehicleCategory;

    @Column(name = "datprvreg")
    private Date firstRegistrationDate;

    @Column(name = "km")
    private Long mileage;

    @Column(name = "zava")
    private Long defectCountA;

    @Column(name = "zavb")
    private Long defectCountB;

    @Column(name = "zavc")
    private Long defectCountC;

    @Column(name = "vyslstk")
    private String inspectionResult;

    @Column(name = "vyslemise")
    private String emissionControlResult;

    public Inspection() {
    }

    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "stk_id")
    public Long getStationId() {
        return stationId;
    }

    public void setStationId(Long stk_id) {
        this.stationId = stk_id;
    }

    @Column(name = "drtp")
    public String getInspectionType() {
        return inspectionType;
    }

    public void setInspectionType(String drtp) {
        this.inspectionType = drtp;
    }

    @Column(name = "vin")
    public String getVIN() {
        return VIN;
    }

    public void setVIN(String vin) {
        this.VIN = vin;
    }

    @Column(name = "datkont")
    public Date getInspectionDate() {
        return inspectionDate;
    }

    public void setInspectionDate(Date datkont) {
        this.inspectionDate = datkont;
    }

    @Column(name = "typmot")
    public String getEngineType() {
        return engineType;
    }

    public void setEngineType(String typmot) {
        this.engineType = typmot;
    }

    @Column(name = "tzn")
    public String getVehicleBrand() {
        return vehicleBrand;
    }

    public void setVehicleBrand(String tzn) {
        this.vehicleBrand = tzn;
    }

    @Column(name = "drvoz")
    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String drvoz) {
        this.vehicleType = drvoz;
    }

    @Column(name = "obchozntyp")
    public String getVehicleModel() {
        return vehicleModel;
    }

    public void setVehicleModel(String obchozntyp) {
        this.vehicleModel = obchozntyp;
    }

    @Column(name = "ct")
    public String getVehicleCategory() {
        return vehicleCategory;
    }

    public void setVehicleCategory(String ct) {
        this.vehicleCategory = ct;
    }

    @Column(name = "datprvreg")
    public Date getFirstRegistrationDate() {
        return firstRegistrationDate;
    }

    public void setFirstRegistrationDate(Date datprvreg) {
        this.firstRegistrationDate = datprvreg;
    }

    @Column(name = "km")
    public Long getMileage() {
        return mileage;
    }

    public void setMileage(Long km) {
        this.mileage = km;
    }

    @Column(name = "zava")
    public Long getDefectCountA() {
        return defectCountA;
    }

    public void setDefectCountA(Long zava) {
        this.defectCountA = zava;
    }

    @Column(name = "zavb")
    public Long getDefectCountB() {
        return defectCountB;
    }

    public void setDefectCountB(Long zavb) {
        this.defectCountB = zavb;
    }

    @Column(name = "zavc")
    public Long getDefectCountC() {
        return defectCountC;
    }

    public void setDefectCountC(Long zavc) {
        this.defectCountC = zavc;
    }

    @Column(name = "vyslstk")
    public String getInspectionResult() {
        return inspectionResult;
    }

    public void setInspectionResult(String vyslstk) {
        this.inspectionResult = vyslstk;
    }

    @Column(name = "vyslemise")
    public String getEmissionControlResult() {
        return emissionControlResult;
    }

    public void setEmissionControlResult(String vyslemise) {
        this.emissionControlResult = vyslemise;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Inspection that = (Inspection) o;
        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Inspection{" +
                "id=" + id +
                ", stk_id=" + stationId +
                ", drtp='" + inspectionType + '\'' +
                ", vin='" + VIN + '\'' +
                ", datkont=" + inspectionDate +
                ", typmot='" + engineType + '\'' +
                ", tzn='" + vehicleBrand + '\'' +
                ", drvoz='" + vehicleType + '\'' +
                ", obchozntyp='" + vehicleModel + '\'' +
                ", ct='" + vehicleCategory + '\'' +
                ", datprvreg=" + firstRegistrationDate +
                ", km=" + mileage +
                ", zava=" + defectCountA +
                ", zavb=" + defectCountB +
                ", zavc=" + defectCountC +
                ", vyslstk='" + inspectionResult + '\'' +
                ", vyslemise='" + emissionControlResult + '\'' +
                '}';
    }
}
