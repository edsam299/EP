/**
 * GmGenInsertByTable.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package network.dhammakaya.fdnet;

public class GmGenInsertByTable  implements java.io.Serializable {
    private java.lang.String tinstrTable;

    private network.dhammakaya.fdnet.GmGenInsertByTableTinImportDt tinImportDt;

    public GmGenInsertByTable() {
    }

    public GmGenInsertByTable(
           java.lang.String tinstrTable,
           network.dhammakaya.fdnet.GmGenInsertByTableTinImportDt tinImportDt) {
           this.tinstrTable = tinstrTable;
           this.tinImportDt = tinImportDt;
    }


    /**
     * Gets the tinstrTable value for this GmGenInsertByTable.
     * 
     * @return tinstrTable
     */
    public java.lang.String getTinstrTable() {
        return tinstrTable;
    }


    /**
     * Sets the tinstrTable value for this GmGenInsertByTable.
     * 
     * @param tinstrTable
     */
    public void setTinstrTable(java.lang.String tinstrTable) {
        this.tinstrTable = tinstrTable;
    }


    /**
     * Gets the tinImportDt value for this GmGenInsertByTable.
     * 
     * @return tinImportDt
     */
    public network.dhammakaya.fdnet.GmGenInsertByTableTinImportDt getTinImportDt() {
        return tinImportDt;
    }


    /**
     * Sets the tinImportDt value for this GmGenInsertByTable.
     * 
     * @param tinImportDt
     */
    public void setTinImportDt(network.dhammakaya.fdnet.GmGenInsertByTableTinImportDt tinImportDt) {
        this.tinImportDt = tinImportDt;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof GmGenInsertByTable)) return false;
        GmGenInsertByTable other = (GmGenInsertByTable) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.tinstrTable==null && other.getTinstrTable()==null) || 
             (this.tinstrTable!=null &&
              this.tinstrTable.equals(other.getTinstrTable()))) &&
            ((this.tinImportDt==null && other.getTinImportDt()==null) || 
             (this.tinImportDt!=null &&
              this.tinImportDt.equals(other.getTinImportDt())));
        __equalsCalc = null;
        return _equals;
    }

    private boolean __hashCodeCalc = false;
    public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = 1;
        if (getTinstrTable() != null) {
            _hashCode += getTinstrTable().hashCode();
        }
        if (getTinImportDt() != null) {
            _hashCode += getTinImportDt().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(GmGenInsertByTable.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", ">gmGenInsertByTable"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("tinstrTable");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "tinstrTable"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("tinImportDt");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "tinImportDt"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", ">>gmGenInsertByTable>tinImportDt"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
    }

    /**
     * Return type metadata object
     */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

    /**
     * Get Custom Serializer
     */
    public static org.apache.axis.encoding.Serializer getSerializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanSerializer(
            _javaType, _xmlType, typeDesc);
    }

    /**
     * Get Custom Deserializer
     */
    public static org.apache.axis.encoding.Deserializer getDeserializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanDeserializer(
            _javaType, _xmlType, typeDesc);
    }

}
