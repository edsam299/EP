/**
 * DbParameter.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package network.dhammakaya.fdnet;

public abstract class DbParameter  extends network.dhammakaya.fdnet.MarshalByRefObject  implements java.io.Serializable {
    private network.dhammakaya.fdnet.DbType dbType;

    private network.dhammakaya.fdnet.ParameterDirection direction;

    private boolean isNullable;

    private java.lang.String parameterName;

    private org.apache.axis.types.UnsignedByte precision;

    private org.apache.axis.types.UnsignedByte scale;

    private int size;

    private java.lang.String sourceColumn;

    private java.lang.Boolean sourceColumnNullMapping;

    private network.dhammakaya.fdnet.DataRowVersion sourceVersion;

    private java.lang.Object value;

    public DbParameter() {
    }

    public DbParameter(
           network.dhammakaya.fdnet.DbType dbType,
           network.dhammakaya.fdnet.ParameterDirection direction,
           boolean isNullable,
           java.lang.String parameterName,
           org.apache.axis.types.UnsignedByte precision,
           org.apache.axis.types.UnsignedByte scale,
           int size,
           java.lang.String sourceColumn,
           java.lang.Boolean sourceColumnNullMapping,
           network.dhammakaya.fdnet.DataRowVersion sourceVersion,
           java.lang.Object value) {
        this.dbType = dbType;
        this.direction = direction;
        this.isNullable = isNullable;
        this.parameterName = parameterName;
        this.precision = precision;
        this.scale = scale;
        this.size = size;
        this.sourceColumn = sourceColumn;
        this.sourceColumnNullMapping = sourceColumnNullMapping;
        this.sourceVersion = sourceVersion;
        this.value = value;
    }


    /**
     * Gets the dbType value for this DbParameter.
     * 
     * @return dbType
     */
    public network.dhammakaya.fdnet.DbType getDbType() {
        return dbType;
    }


    /**
     * Sets the dbType value for this DbParameter.
     * 
     * @param dbType
     */
    public void setDbType(network.dhammakaya.fdnet.DbType dbType) {
        this.dbType = dbType;
    }


    /**
     * Gets the direction value for this DbParameter.
     * 
     * @return direction
     */
    public network.dhammakaya.fdnet.ParameterDirection getDirection() {
        return direction;
    }


    /**
     * Sets the direction value for this DbParameter.
     * 
     * @param direction
     */
    public void setDirection(network.dhammakaya.fdnet.ParameterDirection direction) {
        this.direction = direction;
    }


    /**
     * Gets the isNullable value for this DbParameter.
     * 
     * @return isNullable
     */
    public boolean isIsNullable() {
        return isNullable;
    }


    /**
     * Sets the isNullable value for this DbParameter.
     * 
     * @param isNullable
     */
    public void setIsNullable(boolean isNullable) {
        this.isNullable = isNullable;
    }


    /**
     * Gets the parameterName value for this DbParameter.
     * 
     * @return parameterName
     */
    public java.lang.String getParameterName() {
        return parameterName;
    }


    /**
     * Sets the parameterName value for this DbParameter.
     * 
     * @param parameterName
     */
    public void setParameterName(java.lang.String parameterName) {
        this.parameterName = parameterName;
    }


    /**
     * Gets the precision value for this DbParameter.
     * 
     * @return precision
     */
    public org.apache.axis.types.UnsignedByte getPrecision() {
        return precision;
    }


    /**
     * Sets the precision value for this DbParameter.
     * 
     * @param precision
     */
    public void setPrecision(org.apache.axis.types.UnsignedByte precision) {
        this.precision = precision;
    }


    /**
     * Gets the scale value for this DbParameter.
     * 
     * @return scale
     */
    public org.apache.axis.types.UnsignedByte getScale() {
        return scale;
    }


    /**
     * Sets the scale value for this DbParameter.
     * 
     * @param scale
     */
    public void setScale(org.apache.axis.types.UnsignedByte scale) {
        this.scale = scale;
    }


    /**
     * Gets the size value for this DbParameter.
     * 
     * @return size
     */
    public int getSize() {
        return size;
    }


    /**
     * Sets the size value for this DbParameter.
     * 
     * @param size
     */
    public void setSize(int size) {
        this.size = size;
    }


    /**
     * Gets the sourceColumn value for this DbParameter.
     * 
     * @return sourceColumn
     */
    public java.lang.String getSourceColumn() {
        return sourceColumn;
    }


    /**
     * Sets the sourceColumn value for this DbParameter.
     * 
     * @param sourceColumn
     */
    public void setSourceColumn(java.lang.String sourceColumn) {
        this.sourceColumn = sourceColumn;
    }


    /**
     * Gets the sourceColumnNullMapping value for this DbParameter.
     * 
     * @return sourceColumnNullMapping
     */
    public java.lang.Boolean getSourceColumnNullMapping() {
        return sourceColumnNullMapping;
    }


    /**
     * Sets the sourceColumnNullMapping value for this DbParameter.
     * 
     * @param sourceColumnNullMapping
     */
    public void setSourceColumnNullMapping(java.lang.Boolean sourceColumnNullMapping) {
        this.sourceColumnNullMapping = sourceColumnNullMapping;
    }


    /**
     * Gets the sourceVersion value for this DbParameter.
     * 
     * @return sourceVersion
     */
    public network.dhammakaya.fdnet.DataRowVersion getSourceVersion() {
        return sourceVersion;
    }


    /**
     * Sets the sourceVersion value for this DbParameter.
     * 
     * @param sourceVersion
     */
    public void setSourceVersion(network.dhammakaya.fdnet.DataRowVersion sourceVersion) {
        this.sourceVersion = sourceVersion;
    }


    /**
     * Gets the value value for this DbParameter.
     * 
     * @return value
     */
    public java.lang.Object getValue() {
        return value;
    }


    /**
     * Sets the value value for this DbParameter.
     * 
     * @param value
     */
    public void setValue(java.lang.Object value) {
        this.value = value;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof DbParameter)) return false;
        DbParameter other = (DbParameter) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = super.equals(obj) && 
            ((this.dbType==null && other.getDbType()==null) || 
             (this.dbType!=null &&
              this.dbType.equals(other.getDbType()))) &&
            ((this.direction==null && other.getDirection()==null) || 
             (this.direction!=null &&
              this.direction.equals(other.getDirection()))) &&
            this.isNullable == other.isIsNullable() &&
            ((this.parameterName==null && other.getParameterName()==null) || 
             (this.parameterName!=null &&
              this.parameterName.equals(other.getParameterName()))) &&
            ((this.precision==null && other.getPrecision()==null) || 
             (this.precision!=null &&
              this.precision.equals(other.getPrecision()))) &&
            ((this.scale==null && other.getScale()==null) || 
             (this.scale!=null &&
              this.scale.equals(other.getScale()))) &&
            this.size == other.getSize() &&
            ((this.sourceColumn==null && other.getSourceColumn()==null) || 
             (this.sourceColumn!=null &&
              this.sourceColumn.equals(other.getSourceColumn()))) &&
            ((this.sourceColumnNullMapping==null && other.getSourceColumnNullMapping()==null) || 
             (this.sourceColumnNullMapping!=null &&
              this.sourceColumnNullMapping.equals(other.getSourceColumnNullMapping()))) &&
            ((this.sourceVersion==null && other.getSourceVersion()==null) || 
             (this.sourceVersion!=null &&
              this.sourceVersion.equals(other.getSourceVersion()))) &&
            ((this.value==null && other.getValue()==null) || 
             (this.value!=null &&
              this.value.equals(other.getValue())));
        __equalsCalc = null;
        return _equals;
    }

    private boolean __hashCodeCalc = false;
    public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = super.hashCode();
        if (getDbType() != null) {
            _hashCode += getDbType().hashCode();
        }
        if (getDirection() != null) {
            _hashCode += getDirection().hashCode();
        }
        _hashCode += (isIsNullable() ? Boolean.TRUE : Boolean.FALSE).hashCode();
        if (getParameterName() != null) {
            _hashCode += getParameterName().hashCode();
        }
        if (getPrecision() != null) {
            _hashCode += getPrecision().hashCode();
        }
        if (getScale() != null) {
            _hashCode += getScale().hashCode();
        }
        _hashCode += getSize();
        if (getSourceColumn() != null) {
            _hashCode += getSourceColumn().hashCode();
        }
        if (getSourceColumnNullMapping() != null) {
            _hashCode += getSourceColumnNullMapping().hashCode();
        }
        if (getSourceVersion() != null) {
            _hashCode += getSourceVersion().hashCode();
        }
        if (getValue() != null) {
            _hashCode += getValue().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(DbParameter.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "DbParameter"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("dbType");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "DbType"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "DbType"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("direction");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "Direction"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "ParameterDirection"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("isNullable");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "IsNullable"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "boolean"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("parameterName");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "ParameterName"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("precision");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "Precision"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "unsignedByte"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("scale");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "Scale"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "unsignedByte"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("size");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "Size"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("sourceColumn");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "SourceColumn"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("sourceColumnNullMapping");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "SourceColumnNullMapping"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "boolean"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("sourceVersion");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "SourceVersion"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "DataRowVersion"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("value");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "Value"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "anyType"));
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
