/**
 * Update.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package network.dhammakaya.fdnet;

public class Update  implements java.io.Serializable {
    private network.dhammakaya.fdnet.UpdateDataTable dataTable;

    private java.lang.String keyColumn;

    public Update() {
    }

    public Update(
           network.dhammakaya.fdnet.UpdateDataTable dataTable,
           java.lang.String keyColumn) {
           this.dataTable = dataTable;
           this.keyColumn = keyColumn;
    }


    /**
     * Gets the dataTable value for this Update.
     * 
     * @return dataTable
     */
    public network.dhammakaya.fdnet.UpdateDataTable getDataTable() {
        return dataTable;
    }


    /**
     * Sets the dataTable value for this Update.
     * 
     * @param dataTable
     */
    public void setDataTable(network.dhammakaya.fdnet.UpdateDataTable dataTable) {
        this.dataTable = dataTable;
    }


    /**
     * Gets the keyColumn value for this Update.
     * 
     * @return keyColumn
     */
    public java.lang.String getKeyColumn() {
        return keyColumn;
    }


    /**
     * Sets the keyColumn value for this Update.
     * 
     * @param keyColumn
     */
    public void setKeyColumn(java.lang.String keyColumn) {
        this.keyColumn = keyColumn;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Update)) return false;
        Update other = (Update) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.dataTable==null && other.getDataTable()==null) || 
             (this.dataTable!=null &&
              this.dataTable.equals(other.getDataTable()))) &&
            ((this.keyColumn==null && other.getKeyColumn()==null) || 
             (this.keyColumn!=null &&
              this.keyColumn.equals(other.getKeyColumn())));
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
        if (getDataTable() != null) {
            _hashCode += getDataTable().hashCode();
        }
        if (getKeyColumn() != null) {
            _hashCode += getKeyColumn().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(Update.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", ">Update"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("dataTable");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "DataTable"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", ">>Update>DataTable"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("keyColumn");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "KeyColumn"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
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
