/**
 * PmBulkCopy.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package network.dhammakaya.fdnet;

public class PmBulkCopy  implements java.io.Serializable {
    private network.dhammakaya.fdnet.PmBulkCopyDataTable dataTable;

    private java.lang.String destinationTbl;

    private int batchSize;

    public PmBulkCopy() {
    }

    public PmBulkCopy(
           network.dhammakaya.fdnet.PmBulkCopyDataTable dataTable,
           java.lang.String destinationTbl,
           int batchSize) {
           this.dataTable = dataTable;
           this.destinationTbl = destinationTbl;
           this.batchSize = batchSize;
    }


    /**
     * Gets the dataTable value for this PmBulkCopy.
     * 
     * @return dataTable
     */
    public network.dhammakaya.fdnet.PmBulkCopyDataTable getDataTable() {
        return dataTable;
    }


    /**
     * Sets the dataTable value for this PmBulkCopy.
     * 
     * @param dataTable
     */
    public void setDataTable(network.dhammakaya.fdnet.PmBulkCopyDataTable dataTable) {
        this.dataTable = dataTable;
    }


    /**
     * Gets the destinationTbl value for this PmBulkCopy.
     * 
     * @return destinationTbl
     */
    public java.lang.String getDestinationTbl() {
        return destinationTbl;
    }


    /**
     * Sets the destinationTbl value for this PmBulkCopy.
     * 
     * @param destinationTbl
     */
    public void setDestinationTbl(java.lang.String destinationTbl) {
        this.destinationTbl = destinationTbl;
    }


    /**
     * Gets the batchSize value for this PmBulkCopy.
     * 
     * @return batchSize
     */
    public int getBatchSize() {
        return batchSize;
    }


    /**
     * Sets the batchSize value for this PmBulkCopy.
     * 
     * @param batchSize
     */
    public void setBatchSize(int batchSize) {
        this.batchSize = batchSize;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof PmBulkCopy)) return false;
        PmBulkCopy other = (PmBulkCopy) obj;
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
            ((this.destinationTbl==null && other.getDestinationTbl()==null) || 
             (this.destinationTbl!=null &&
              this.destinationTbl.equals(other.getDestinationTbl()))) &&
            this.batchSize == other.getBatchSize();
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
        if (getDestinationTbl() != null) {
            _hashCode += getDestinationTbl().hashCode();
        }
        _hashCode += getBatchSize();
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(PmBulkCopy.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", ">pmBulkCopy"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("dataTable");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "dataTable"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", ">>pmBulkCopy>dataTable"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("destinationTbl");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "DestinationTbl"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("batchSize");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "batchSize"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
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
